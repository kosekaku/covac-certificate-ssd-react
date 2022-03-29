import { Table, TableBody, TableHead, TableRow, TableCell } from '@dhis2/ui';
import React, { useState, useEffect } from 'react';
import { CertificateQrcode } from './certificateQrcode';

export const CertificateBio = ({ state, teiId }) => {
  const events = state.enrollments; // get events on enrollment entity
  // entity attributes
  let firstName,
    lastName,
    otherName,
    gender,
    dateOfBirth,
    age,
    uuid,
    phone,
    occupation,
    address;

    // vaccine info
  let vaccineName,
    batchNumber,
    doseAdministered,
    dateofVaccination,
    placeOfVaccination;
  state.attributes.map((person, index) => {
    if (person.attribute === 'sB1IHYu2xQT') return (firstName = person.value);
    if (person.attribute === 'ENRjVGxVL6l') return (lastName = person.value);
    if (person.attribute === 'NfbmVFsS80D') return (otherName = person.value);
    if (person.attribute === 'NI0QRzJvQ0k') return (dateOfBirth = person.value);
    if (person.attribute === 'Rv8WM2mTuS5') return (age = person.value);
    if (person.attribute === 'KSr2yTdu1AI') return (uuid = person.value);
    if (person.attribute === 'oindugucx72') return (gender = person.value);
    if (person.attribute === 'fctSQp5nAYl') return (phone = person.value);
    if (person.attribute === 'LY2bDXpNvS7') return (occupation = person.value);
    if (person.attribute === 'Xhdn49gUd52') return (address = person.value);
  });
  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <div className="vaccine-card-bio-info">
            <p>
              This is to certify that{' '}
              <b>
                {firstName} {lastName} {otherName},{' '}
              </b>
              , born on <b>{dateOfBirth}</b>, bearing vaccination{' '}
              <b>identification Id: {uuid}</b>, has been vaccinated in South
              Sudan against <b>Covid 19</b> on date indicated in accordance with
              the National Health Regulations.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="vaccine-card-dose-container">
            <Table className="table-responsive table-borderless table-hover">
              <TableHead>
                <TableRow className="vaccine-card-dose-table-header">
                  <TableCell>Name of vaccine </TableCell>
                  <TableCell>Batch number</TableCell>
                  <TableCell>Doeses administered</TableCell>
                  <TableCell>Date of Vaccination</TableCell>
                  <TableCell>Place of Vaccination</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((entity, index) => {
                  if(entity !==null) {
                    entity.dataValues.map((element, index) => {
                      dateofVaccination = entity.eventDate.slice(0,10);
                      placeOfVaccination = entity.orgUnitName;
                      if (element.dataElement === 'bbnyNYD1wgS')
                        return (vaccineName = element.value); // vaccine type
                      if (element.dataElement === 'Yp1F4txx8tm')
                        return (batchNumber = element.value); // batch number
                      if (element.dataElement === 'LUIsbsm3okG')
                        return (doseAdministered = element.value); // dose adminstered
                    });
                
            
                  return (
                    <TableRow key={index}>
                      <TableCell className="vaccine-card-dose-table-value">
                        {vaccineName}
                      </TableCell>
                      <TableCell className="vaccine-card-dose-table-value">
                        {batchNumber}
                      </TableCell>
                      <TableCell className="vaccine-card-dose-table-value">
                        {doseAdministered}
                      </TableCell>
                      <TableCell className="vaccine-card-dose-table-value">
                        {dateofVaccination}
                      </TableCell>
                      <TableCell className="vaccine-card-dose-table-value">
                        {entity.orgUnitName}
                      </TableCell>
                    </TableRow>
                  );
                }else{} // no events
                })}
              </TableBody>
            
            </Table>
          </div>
        </div>
      </div>
      <CertificateQrcode
      
        state={{
          firstName,
          lastName,
          otherName,
          gender,
          dateOfBirth,
          age,
          uuid,
          phone,
          vaccineName,
          batchNumber,
          doseAdministered,
          dateofVaccination,
          placeOfVaccination,
          teiId,
        }}
      />
      
    </React.Fragment>
  );
};
