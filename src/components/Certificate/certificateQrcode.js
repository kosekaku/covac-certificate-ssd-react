import React from 'react';
import QRCode from 'qrcode.react';

export const CertificateQrcode = ({state}) => {
  const {firstName, lastName, otherName,gender, dateOfBirth, age, uuid,phone,
    vaccineName, batchNumber, doseAdministered, dateofVaccination, placeOfVaccination, teiId} = state;
  const url = `http://localhost:3000/print/verify?id=${teiId}`;
  // helper to check for undefined
  const checkUndefined = (data) => data? data: '';
  return (
    <div className="row">
      <div className="col" style={{display: 'flex', flexDirection:'column', margin:'0% 0% 1% 45%'}}>
      <span style={{padding:'1%'}}>scan to validate</span>
      <QRCode value={
        `
        Identification number: ${checkUndefined(uuid)}
        Full name: ${checkUndefined(firstName)} ${checkUndefined(lastName)} ${checkUndefined(otherName)}
        Date of Birth: ${checkUndefined(dateOfBirth)}
        Age: ${checkUndefined(age)}
        Gender: ${checkUndefined(gender)}
        Phone: ${checkUndefined(phone)}
        Vaccine: ${checkUndefined(vaccineName)}
        Date: ${checkUndefined(dateofVaccination)}
        Place: ${checkUndefined(placeOfVaccination)}

        ${url}
        `}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        imageSettings={{
          src: "/icons/ministry.png",
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
        />
      </div>
    </div>
  );
};
