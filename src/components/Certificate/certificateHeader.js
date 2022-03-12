import React from 'react'

export const CertificateHeader = () => {
  return(
    <div>
    <div className="vaccine-card-header-container">
      <div className="vaccine-card-herader-sub-container">
        <h2>COVID-19 VACCINATION CERTIFICATE</h2>
      </div>
      <div className="vaccine-card-herader-sub-container">
        <h2>REPUBLIC OF SOUTH SUDAN</h2>
      </div>
      <div className="vaccine-card-herader-sub-container" >
        <img
          className="icon"
          src="/icons/south-sudan-flag.png"
          alt=""
          
        />
      </div>
      <div className="vaccine-card-herader-sub-container">
        <h2>MINISTRY OF HEALTH</h2>
      </div>
    </div>
  </div>
  )

};
