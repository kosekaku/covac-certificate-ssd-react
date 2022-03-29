import React from 'react';

const InputText = ({ name, label, error, ...rest }) => {
  return (
    <>
      <div className="form-group row mb-2" >
        <label htmlFor={name} className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <input {...rest} name={name} id={name} className="form-control " />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </>
  );
};

export {InputText};