import Joi from 'joi-browser'; 

// Validation schema
const schemaName = {
  uniqueId: Joi.string().min(5).label('Unique vaccination Id'),
  phone: Joi.string().min(12).max(12).label('Phone number').error(() => {
    return {
      message: 'Phone number must be 9 values Ex. 928111111',
    };
  }),

};


const validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  const schema = { [name]: schemaName[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

// before submission
const validateSchema = (uniqueId,phoneNumber
  ) => {
  // const data1 = {
  //   uniqueId: uniqueId,
  //   phone: phoneNumber,
  // };
  const dataId = {
    uniqueId: uniqueId,
  };
  const dataPhone = {
    phone: phoneNumber,
  };
  const errors = {};
  const options = { abortEarly: false };
  let errorValidation;
  if(uniqueId !==''){
    errorValidation = Joi.validate(dataId, schemaName, options);

  } else {
    errorValidation = Joi.validate(dataPhone, schemaName, options);
  } 
  const {error} = errorValidation;
  if (!error) return null;
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
    return errors;
  }
};

export {validateProperty, validateSchema}