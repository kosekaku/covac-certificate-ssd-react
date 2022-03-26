import { InputText } from '../commons/input';
import { PhoneInputBox } from '../commons/phoneInput';

 const renderLoadingButton = (name, ...others) => {
  return (
    <div className="text-center">
      <button className="btn " type="text" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {name}
      </button>
    </div>
  );
};
  const renderInput = (
  handleChange,
  data,
  name,
  label,
  error,
  setState,
  placeHolder,
  type = 'text',
  value,
  autoFocus = false,
  disabled = false,
  ...rest
) => {
  return (
    <InputText
      name={name}
      label={label}
      type={type}
      error={error[name]}
      onChange={(e) => {
        handleChange(e);
        setState(data[name]);
      }}
      placeholder={placeHolder}
      autoFocus={autoFocus}
      disabled={disabled}
      value={value}
    />
  );
};

 const renderPhoneInput = (handleChangePhone, name, label, error, value ) => {
  return (
    <PhoneInputBox
      name={name}
      label={label}
      error={error[name]}
      value={value}
      onChange={(e) => {
        handleChangePhone(e);
      }}
    
    />
  );
};
 const renderButton = (name, ...others) => {
  return (
    <div className="d-flex justify-content-left align-content-center">
      <button type="submit" className="btn btn-secondary ">
        {name}
      </button>
    </div>
  );
};

export {
 renderLoadingButton,renderInput,renderPhoneInput,renderButton,
}