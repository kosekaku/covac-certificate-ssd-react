import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Divider } from '@dhis2/ui';
import PrintingGuide from './printinGuides';
import { validateProperty, validateSchema } from './schema/mainLandingSchema';
import SearchNotFound from './notFoundPages/searchNotFound';
import {
  renderLoadingButton,
  renderInput,
  renderPhoneInput,
  renderButton,
} from './Helpers/renderFormFields';
import { certificateTEI } from '../services/certificateService';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/styles.css';

const MainContent = () => {
  // declaring and initiazing states
  const [phoneEntered, setphoneEntered] = useState(''); // phone number
  const [uniqueId, setUniqueId] = useState('');
  const [tei, setTEI] = useState([]); // tei =tracked entity instance from the dhis2 api
  const [loadingTEI, setLoadingTEI] = useState(true);
  const [handleSubmitClicks, setHandleSubmitClicks] = useState(0);

  // validations states data and error
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handlePrintPage = (data, teiID, index, ...props) => {
    const sendData = { data, teiId: teiID };
    navigate('/print', { state: sendData }); // send data to the printing component
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateSchema(uniqueId, phoneEntered);
    setError(errors || {});
    if (errors) return;
    
    setHandleSubmitClicks(1);
    setLoadingTEI(true);
    
    // call the TEI api services
    let teiEnrollments = await certificateTEI(phoneEntered, uniqueId);

    // check if there is a valid response from the api service
    if (teiEnrollments === undefined) {
      setLoadingTEI(false);
      setTEI([]); // reset state, this allows user to perform the search again
    } else {
      setTEI([teiEnrollments]);
      setLoadingTEI(false);
      setHandleSubmitClicks(0);
    }
  }; // end handle submit

  const handleChange = ({ currentTarget: input }) => {
    data[input.name] = input.value;
    const errors = { ...error };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setData({ data });
    setError(errors);
  };

  const handleChangePhone = (e, validator) => {
    data['phone'] = e;
    setphoneEntered(e);

    const errors = { ...error };
    const errorMessage = validateProperty({ name: 'phone', value: e });
    if (errorMessage) errors['phone'] = errorMessage;
    else delete errors['phone'];
    setData({ data });
    setError(errors);
  };

  let uniqueId1,
    serverFirstName,
    serverLastName,
    serverDOB,
    serverGender,
    serverOccupation,
    serverAddress,
    serverPhone;

  const [idInputVisible, setIdInputVisible] = useState(true);
  const [phoneInputVisible, setPhoneInputVisible] = useState(false);
  const [buttonVisibleText, setButtonVisibleText] = useState('Click to use phone number');



  const handleToogle = () => {
    if (idInputVisible) {
      setIdInputVisible(false);
      setUniqueId('');
      setButtonVisibleText('Click to use unique id number');
    } else {
      setIdInputVisible(true);
    }
    if (phoneInputVisible) {
      setPhoneInputVisible(false);
      setphoneEntered('');
      setButtonVisibleText('Click to use phone number');
    } else {
      setPhoneInputVisible(true);
    }
  };
  return (
    <>
      <div className="container">
        <p className="d-flex justify-content-center">
          {' '}
          <img
            className="icon img-responsive"
            src="/icons/ministry.png"
            alt="Ministry of Health-Juba"
          />
        </p>
        <p className="d-flex justify-content-center">Ministry of Health</p>
        <p className="d-flex justify-content-center">Republic of South Sudan</p>
        <p className="d-flex justify-content-center mt-2">
          Covid-19 Vaccine certificate
        </p>
        <div>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                {idInputVisible &&
                  renderInput(
                    handleChange,
                    data,
                    'uniqueId',
                    'Vaccination card Id',
                    error,
                    setUniqueId,
                    'Enter unique id card number written on your card',
                    'text',
                    uniqueId,
                    true
                  )}
                {phoneInputVisible &&
                  renderPhoneInput(
                    handleChangePhone,
                    'phone',
                    'Registered Number',
                    error,
                    phoneEntered
                  )}

                <div className="row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 mb-2 ">
                    <button
                      type="submit"
                      className="container btn btn-secondary btn-sm"
                    >
                      Search certificate
                    </button>
                  </div>
                 
                </div>
                <p className="text-center">
                  {' '}
                  <small>
                    Don't remember your number?{' '}
                    <span
                      className="text-info"
                      style={{ cursor: 'pointer' }}
                      onClick={handleToogle}
                    >
                     
                      {buttonVisibleText}
                    </span>
                  </small>{' '}
                </p>
              </form>
              {handleSubmitClicks === 1 &&
                loadingTEI === true &&
                renderLoadingButton('Searching for certificate...')}
            </div>
          </div>
          <Divider dense />
          <div>
            <React.Fragment>
              {tei.length !== 0 && (
                <div style={{ overflowX: 'auto' }}>
                  <table>
                    <tr>
                      <th>Unique Id</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Gender</th>
                      <th>Occupation</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                    <>
                      {tei.length !== 0 &&
                        tei.map((data, index) => {
                          // load expected attributes
                          data.attributes.filter(
                            ({ attribute, value }, index) => {
                              if (
                                attribute === 'KSr2yTdu1AI' &&
                                value.trim() !== ''
                              )
                                return (uniqueId1 = value.trim());
                              if (attribute === 'sB1IHYu2xQT')
                                return (serverFirstName = value.trim());
                              if (attribute === 'ENRjVGxVL6l')
                                return (serverLastName = value.trim());
                              if (attribute === 'NI0QRzJvQ0k')
                                return (serverDOB = value);
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
                        })}

                      <tr onClick={() => handlePrintPage(tei[0], tei[0].teiId)}>
                        <td>{uniqueId1}</td>
                        <td>{serverFirstName}</td>
                        <td>{serverLastName}</td>
                        <td>{serverDOB}</td>
                        <td>{serverGender}</td>
                        <td>{serverOccupation}</td>
                        <td>{serverAddress}</td>
                        <td>{serverPhone}</td>
                        <td>
                          {uniqueId1 && (
                            <button
                              className="btn btn-secondary"
                              onClick={() =>
                                handlePrintPage(tei[0], tei[0].teiId)
                              }
                            >
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    </>
                  </table>
                </div>
              )}
              <>
                {tei.length === 0 && loadingTEI === false && <SearchNotFound />}
              </>
            </React.Fragment>
            <PrintingGuide />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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
