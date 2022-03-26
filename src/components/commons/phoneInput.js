import reduce from 'lodash.reduce';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputBox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group row mb-2">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <PhoneInput
          {...rest}
          country={'ss'}
          countryCodeEditable={false}
          enableSearch={true}
          inputProps={{
            name: 'phone',
            id: 'phone',
            required: true,
            autoFocus: false,
            
          }}

          // isValid={(value, country) => {
            
          //   if (value.toString().startsWith(`${country.dialCode}0`))
         
          //     return <p className="text-info" style={{
          //       padding: '10px',
          //       marginTop: '-5rem',
          //     }}>'Number must not start with 0'</p>;
          //   if (value.length >= 13 )
          //     return 'Number must not be more than 9'
          
          //   if (
          //     country.dialCode === '211' &&
          //     !value.toString().startsWith(`${country.dialCode}9`)
          //   )
          //     return `South Sudan number must start with 9`;
          // }}
         
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export {PhoneInputBox};
