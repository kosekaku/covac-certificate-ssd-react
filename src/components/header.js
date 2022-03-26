import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.setItem('token',null );
   return  navigate('/');
  };
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Ministry of Health
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Public Certificate Portal <span className="sr-only">(MOH)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                vaccination centers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Printing guides
              </a>
            </li>
            <li onClick={handleLogout} className="nav-item mr-auto" style={{alignText: ""}}>
              <a className="nav-link" href="/">
                Log out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
