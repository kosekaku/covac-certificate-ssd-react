import Joi from 'joi-browser'; 

// Validation schema
const schemaName = {
  uniqueId: Joi.string().min(5).required().label('Unique vaccination Id'),
  phone: Joi.string().max(12).label('Phone number').error(() => {
    return {
      message: 'Phone number must be 9 values',
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
  const data1 = {
    uniqueId: uniqueId,
    phone: phoneNumber,
  };

  const errors = {};
  const options = { abortEarly: false };
  const { error } = Joi.validate(data1, schemaName, options);
  if (!error) return null;
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
    return errors;
  }
};

export {validateProperty, validateSchema}