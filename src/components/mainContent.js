import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Input, Divider, OrganisationUnitTree } from '@dhis2/ui';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2';
import LoadingIndicator from './Helpers/loadingIndicator';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles/styles.css';
import './Helpers/customStyles.css'; // custom css
import {
  useOrgUnits,
  certificateTEI,
} from '../services/certificateService';
import PrintingGuide from './printinGuides';

const MainContent = () => {
  // declaring and initiazing states
  const [vaccinationCardId, setvaccinationCardId] = useState('');
  // to send to sever
  const [vaccineCenter, setVaccineCenter] = useState([]);
  const [vaccinateDate, setVaccinateDate] = useState(new Date()); // Splited into start & end date at the submit handler
  const [phoneEntered, setphoneEntered] = useState(''); // phone number
  const [uniqueId, setUniqueId] = useState(''); //BUG same input for first name
  const [pageSize, setPageSize] = useState(10); // TODO set this at the server or services
  // ends to send to sever
  const [suggestions, setSuggestions] = useState([]);
  const [orgUnitsCenter, setorgUnitsCenter] = useState([]); // from all dhis2 api
  const [ouErrors, setOuErrors] = useState();
  const [tei, setTEI] = useState([]); // tei =tracked entity instance from the dhis2 api
  const [loadingOU, setLoadingOU] = useState(true);
  const [loadingTEI, setLoadingTEI] = useState(true);
  const [loadingSwitchOU, setLoadingSwitch] = useState(true);
  const [handleSubmitClicked, setHandleSubmitClicked] = useState(0);
  const [debouncedTerm, setDebouncedTerm] = useState(vaccinationCardId); // depend on the vaccineId state
  let [countSubmitClicks, setCountSubmitClicks] = useState(0);

  // Initiating function calls
  const organizationUnits = useOrgUnits(); // orgnization units services
  const navigate = useNavigate();

  // load organization unit effects
  useEffect(() => {
 
    if (organizationUnits.data === undefined) return null;
    const { data } = organizationUnits.data.data;
    if(!data) return null;
    let facilities = [];
    data.map((ou, index)=> {
      facilities.push({ name: ou.name, id: ou.id });
    });
    setorgUnitsCenter(facilities);
    setLoadingOU(false);
  }, [organizationUnits.isLoading, loadingSwitchOU]); // [] calls the effects only once

  // useEffect for debounce- waiting to allow user to finish typing/searching their certificate with the id,before display messages
  useEffect(() => {
    // wait for a second before checking if user is available or not
    const timer = setTimeout(() => setvaccinationCardId(debouncedTerm), 1000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  // TODO useEffect for TEI

  // handle printing when user is found and clicked or view button is clickec
  const handlePrintPage = (data, teiID, index, ...props) => {
    const sendData = { data, teiId: teiID };
    navigate('/print', { state: sendData }); // send data to the printing component
  };

  // handle facility/ vaccine center search
  const handleFacilitySearch = ({ currentTarget }) => {
    const { value } = currentTarget;
    let matchedFacilities = [];
    if (value.length > 0 && value !== '') {
      if (orgUnitsCenter) {
        matchedFacilities = orgUnitsCenter.filter((center) => {
          // TODO filtering huge OUS 5K+ optimization of filter
          let pattern1 = new RegExp(`${value}*`, 'gi');
          return center.name.match(pattern1);
        });
      }
      setOuErrors(); // if users starts typing , clear the ou warning from the screen
      setSuggestions(matchedFacilities);
    }
    setVaccineCenter([]); //  set  ccenter to null
  };

  // handle suggetsions clicked
  const onSuggestionsHandler = (name, id) => {
    setVaccineCenter({ name, id }); // set the selected vaccine
    setSuggestions([]); // reset suggestions
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCountSubmitClicks(countSubmitClicks++);
    setHandleSubmitClicked(1);
    setLoadingTEI(true);
    // Formate date to a DHIS2 date year-month-date format and update to a month ahead and behind the selected date
    // move start date behind by one month and move end date ahead by a month
    let currentYear = parseInt(`${vaccinateDate.getFullYear()}`);
    let currentMonth = parseInt(`${vaccinateDate.getMonth() + 1}`);
    let currentDay = parseInt(`${vaccinateDate.getDate()}`);
    let moveStartDateBehind;
    let moveEndDateAhead;
    if (currentMonth === 1) {
      let currentMonthBack = 12;
      let currentDayBack = 1;
      moveStartDateBehind = `${
        currentYear - 1
      }-${currentMonthBack}-${currentDayBack}`;
      moveEndDateAhead = `${currentYear}-${currentMonth + 1}-${currentDayBack}`;
    } else if (currentMonth === 12) {
      // increase the last updated end date by 1 month, and 1 year, and reset day ie. 2020-12-20 to 2021-01-01
      // descrese the last updated start date by 1 month and reset day to 1st ie. 2020-12-20 to 2020-11-01
      let currentMonthAdd = 1; // january
      let currentYearAdd = currentYear++; // next year
      let currentDayAdd = 1; // 1st
      moveEndDateAhead = `${currentYearAdd}-${currentMonthAdd}-${currentDayAdd}`;
      moveStartDateBehind = `${currentYear}-${
        currentMonth - 1
      }-${currentDayAdd}`;
    } else {
      currentDay = 1; // set the date as 1 despite selected date
      moveStartDateBehind = `${currentYear}-${currentMonth - 1}-${currentDay}`;
      moveEndDateAhead = `${currentYear}-${currentMonth + 1}-${currentDay}`;
    }
    const lastUpdatedStartDate = moveStartDateBehind;
    const lastUpdatedEndDate = moveEndDateAhead;

    if (vaccineCenter.length === 0)
      return setOuErrors(
        'Vaccine Center not found, please enter correct name and select from suggestions below..'
      );
    setOuErrors();
    
    // call the TEI api services
    let teiEnrollments = await certificateTEI(
      vaccineCenter.id,
      lastUpdatedStartDate,
      lastUpdatedEndDate,
      phoneEntered,
      uniqueId,
      pageSize
    );
    
    // check if there is a valid response from the api service
    if(teiEnrollments=== undefined){
      setLoadingTEI(false);
      setTEI([]); // reset state, this allows user to perform the search again
      return null;
    }else{
      setTEI([teiEnrollments]);
      setLoadingTEI(false);
      setHandleSubmitClicked(0);

    }
  }; // end handle submit

  // TODO handle searching of the Patient using unique identifier or combination of phone number and first name
  const handleSearch = ({ value }) => {
    // get data from the return data from the api
    // search by vaccination card id, or name, phone number, etc
    // debounce to wait after 1 second before updating the state
    setDebouncedTerm(value.trim()); // update search term ie if id, name , etc
    //setvaccinationCardId(value.trim());
  };

  let results = tei;
  let loadingTime = 1000; // default loading indicator autoclose when ou data is available
  (() => {
    if (orgUnitsCenter.length === 0) return (loadingTime = 10000); // wait until ou finish loading
  })(); //IIF for loading organization units

  let state,
    county,
    payam,
    uniqueId1,
    serverFirstName,
    serverLastName,
    serverOtherName,
    serverDOB,
    age,
    serverGender,
    serverOccupation,
    serverAddress,
    serverPhone;
    
  return (
    <>
      {organizationUnits.isLoading === true && loadingSwitchOU && <LoadingIndicator />}
      {orgUnitsCenter.length !== 0 && (
        <div className="container">
          <p className="d-flex justify-content-center">
            {' '}
            <img
              className="icon img-responsive"
              src="/icons/ministry.png"
              // width="100" height="150"
              alt="Ministry of Health-Juba"
            />
          </p>
          <p className="d-flex justify-content-center">Ministry of Health</p>
          <p className="d-flex justify-content-center">
            Republic of South Sudan
          </p>
          <p className="d-flex justify-content-center">
            Covid-19 Vaccine certificate
          </p>
          <div>
            <div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="vaccineCenter"
                      className="col-sm-2 col-form-label"
                    >
                      Vaccination Center
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="vaccineCenter"
                        placeholder="Enter vaccination center"
                        name="vaccineCenter"
                        value={vaccineCenter.name}
                        autoFocus={true}
                        onChange={handleFacilitySearch}
                      />
                      {ouErrors && (
                        <div className="alert alert-warning" role="alert">
                          <strong>oops!</strong> {ouErrors}
                        </div>
                      )}

                      {
                        suggestions &&
                          suggestions.map((center, index) => (
                            <div
                              className="suggestions"
                              style={{ cursor: 'pointer', background: '' }}
                              key={center.id}
                              onClick={() =>
                                onSuggestionsHandler(center.name, center.id)
                              }
                            >
                              {center.name}
                            </div>
                          ))
                      }
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="vaccineDate"
                      className="col-sm-2 col-htmlForm-label"
                    >
                      Vaccination Date
                    </label>
                    <div
                      className="col-sm-10"
                      style={{ margin: '10px 0px 15px 0px' }}
                    >
                      <DatePicker
                        selected={vaccinateDate}
                        onChange={(date) => setVaccinateDate(date)}
                        selectsStart
                        vaccinateDate={vaccinateDate}
                        //endDate={endDate}
                        dateFormat="yyyy-MM-dd"
                        id="vaccineDate"
                        maxDate={new Date()}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">
                      Phone
                    </label>
                    <div className="col-sm-10">
                      <PhoneInput
                        country={'ss'}
                        value={phoneEntered}
                        onChange={(phone) => setphoneEntered(phone)}
                        countryCodeEditable={false}
                        inputProps={{
                          name: 'phone',
                          id: 'phone',
                          required: true,
                          autoFocus: false,
                        }}
                        isValid={(value, country) => {
                          if (
                            value.toString().startsWith(`${country.dialCode}0`)
                          )
                            return 'Phone number must not start with zero(0)';

                          if (
                            country.dialCode === '211' &&
                            !value.toString().startsWith(`${country.dialCode}9`)
                          )
                            return `South Sudan phone numbers must start with 9`;

                        }}
                        // placeholder="enter number..."
                        // preferredCountries={['KE','UG','TZ','RW', 'US','EU']}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="uniqueId"
                      className="col-sm-2 col-form-label"
                    >
                      Unique Id
                    </label>
                    <div className="col-sm-10">
                      <Input
                        dense
                        name="uniqueId"
                        //onChange={handleSearch}
                        onChange={(id) => setUniqueId(id.value.trim())}
                        placeholder="Enter vaccination card id ex CES_Jub_...."
                        value={uniqueId}
                        type="text"
                        id="uniqueId"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-left align-content-center">
                    <button type="submit" className="btn btn-secondary ">
                      Generate Certificate
                    </button>
                  </div>
                </form>
                  {
                  handleSubmitClicked === 1 &&
                  loadingTEI === true && (
                    <div className="text-center">
                      <button className="btn " type="text" disabled>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Preparing certificate
                      </button>
                    </div>
                  )}
              </div>
            </div>
            <Divider dense />
            <div>
              <React.Fragment>
                {!loadingTEI && (
                  <div style={{ overflowX: 'auto' }}>
                    <table>
                      <tr>
                        <th>Unique Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DOB</th>
                        {/* <th>Age</th> */}
                        <th>Gender</th>
                        <th>Occupation</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                      </tr>
                      <>
                        {tei.length !== 0 && (
                          tei.map((data, index)=> {
                            // load expected attributes
                            console.log('Hello length', results.tei, serverFirstName)
                            data.attributes.filter(
                              ({ attribute, value }, index) => {
                                  console.log('data logged ', attribute, value);
                                if (
                                  attribute === 'KSr2yTdu1AI' &&
                                  value.trim() !== ''
                                )
                                  return (uniqueId1 = value.trim());
                                if (attribute === 'sB1IHYu2xQT')
                                  return (serverFirstName = value.trim());
                                if (attribute === 'ENRjVGxVL6l')
                                  return (serverLastName = value.trim());
                                if (attribute === 'NfbmVFsS80D')
                                  return (serverOtherName = value.trim());
                                if (attribute === 'NI0QRzJvQ0k')
                                  return (serverDOB = value);
                                if (attribute === 'Rv8WM2mTuS5')
                                  return (age = value.trim());
                                if (attribute === 'oindugucx72')
                                  return (serverGender = value.trim());
                                if (attribute === 'LY2bDXpNvS7')
                                  return (serverOccupation = value);
                                if (attribute === 'Xhdn49gUd52')
                                  return (serverAddress = value.trim());
                                if (attribute === 'fctSQp5nAYl')
                                  return (serverPhone = value.trim());
                              }
                            );
                          })
                        )}
                       
                       
                        <tr
                          onClick={() =>
                            handlePrintPage(
                              tei[0],
                              tei[0].trackedEntityInstance
                            )
                          }
                        >
                          <td>{uniqueId1}</td>
                          <td>{serverFirstName}</td>
                          <td>{serverLastName}</td>
                          <td>{serverDOB}</td>
                          <td>{serverGender}</td>
                          <td>{serverOccupation}</td>
                          <td>{serverAddress}</td>
                          <td>{serverPhone}</td>
                          <td>
                            { // load button only if there's data return- uniqueId or Firstname
                            uniqueId1 && 
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                handlePrintPage(
                                  tei[0],
                                  tei[0].trackedEntityInstance
                                )
                              }
                            >
                              View
                            </button>
                              }
                          </td>
                        </tr>
                      
                      </>
                      <tfoot>
                        <tr>
                          <td colSpan="8">
                            {tei.length === 0 && serverFirstName === undefined && loadingTEI===false && (
                              <div
                                className="card mb-3 mx-auto"
                                style={{
                                  maxWidth: '40rem',
                                  margin: '10px',
                                  boxShadow: '0px 1px 0px yellow',
                                }}
                              >
                                <div className="card-header d-flex justify-content-center align-content-center">
                                  {' '}
                                  <p>
                                    Sorry!! user not found, make sure you have
                                    entered the right information
                                  </p>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </React.Fragment>
              <PrintingGuide />
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        //autoClose={loadingTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MainContent;