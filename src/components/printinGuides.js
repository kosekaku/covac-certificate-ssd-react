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
          The Ministry of Health is glad that you have gotten your vaccination, and we would like to
          guide you to print your proof of vaccination certificate....
        </h6>
        <ol className="card-text  list-group list-group-numbered">
          <li className="list-group-item">
            Enter the correct vaccination unique number EX.<strong>CES_JUB_JTH_000016641/21</strong> 
            You can find the number on your vaccine card
          </li>
          <li className="list-group-item ">
        
            Enter your valid mobile phone number you used during the vaccination, 
            Phone must not start with <strong>0</strong>, Ex. if your number is 0921000000,
            then enter <strong>921000000</strong>
          </li>
          <li className="list-group-item ">
              If you used <strong>Non-South Sudanese mobile network numbers</strong>, then Select
              your country code and enter your phone number without starting with zero
          </li>
          <li className="list-group-item ">
            Click on the search button to find your certificate, if your certificate is available,
            you should be able to see your name and other details, then click to view certificate  
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
