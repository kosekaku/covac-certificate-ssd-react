import React from 'react';

const PrintingGuide = () => {
  return (
    <div
      className="card border-info mb-3 mx-auto"
      style={{ 'maxWidth': '50rem',margin:"50px",boxShadow: "5px 10px 18px lightblue", backgroundColorh:'lightblue'}}
    >
      <div className="card-header d-flex justify-content-center align-content-center">
        {' '}
        <h6>Welcome to the Covid-19 vaccination certificate printing portal</h6>
      </div>
      <div className="card-body " >
        <h6 className="card-title d-flex justify-content-center align-content-center">
          We are glad you have gotten your vaccination, and we would like to
          guide you to print your proof of vaccination certificate....
        </h6>
        <ol className="card-text  list-group list-group-numbered">
          <li className="list-group-item">
            Enter the correct facility where you got vaccinated
          </li>
          <li className="list-group-item ">
            Select the date of vaccination
          </li>
          <li className="list-group-item ">
            Enter the correct mobile phone number you used during the
            vaccination, enter the phone number without the leading 0 ie if
            number is 0920000000, enter as 920000000
          </li>
          <li className="list-group-item">
            Click the generate certificate button, to prepare your certificate
          </li>
          <li className="list-group-item ">
            Search your certificate using your unique identification number or
            firstname
          </li>
        </ol>

        <p className="card-text">
          <small className="text-muted d-flex justify-content-center align-content-center">
            For further assistance, contact the Ministry of Health
          </small>
        </p>
      </div>
    </div>
  );
};

export default PrintingGuide;
