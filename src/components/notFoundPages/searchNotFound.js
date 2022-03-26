import React from 'react';

const SearchNotFound =({statusCode}) => {
  return(
    <div
    className="card mb-3 mx-auto text-center"
    style={{
      maxWidth: '40rem',
      margin: '10px',
      boxShadow: '0px 1px 0px yellow',
    }}
  >
    <div className="card-header d-flex justify-content-center align-content-center">
      {' '}
      <p>
        Sorry!! user! not found, make sure you have
        entered the right information
      </p>
    </div>
  </div>

  )
};

export default SearchNotFound;