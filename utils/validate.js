import httpStatus from 'http-status';
import ApiError from './apiError';
import pickKeys from './pickKeys';

const validate = (schema) => (req, res, next) => {
  // get keys that are needed to validate from objectToValidate
  const validSchema = pickKeys(schema, ['params', 'query', 'body']);
  const objectToValidate = pickKeys(req, Object.keys(validSchema));

  // objectToValidate.

  const { value, error } = validSchema.validate(objectToValidate, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (error) {
    const errorMessages = error.details.reduce((errorMessages, key) => {
      errorMessages.push(key.message);
      return errorMessages;
    }, []);
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessages));
  }
  // Object.assign(req, value);
  // return next();
};
