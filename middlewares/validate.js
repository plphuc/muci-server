"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = exports.validateReq = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError.js"));
var _pickKeys = _interopRequireDefault(require("../utils/pickKeys.js"));
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var validateReq = exports.validateReq = function validateReq(schema) {
  return function (req, res, next) {
    var _req$headers$content;
    if ((_req$headers$content = req.headers['content-type']) !== null && _req$headers$content !== void 0 && _req$headers$content.includes('multipart/form-data')) {
      return next();
    }
    ;
    // get keys that are needed to validate from objectToValidate
    var validSchema = (0, _pickKeys["default"])(schema, ['params', 'query', 'body']);
    var objectToValidate = (0, _pickKeys["default"])(req, Object.keys(validSchema));

    // Joi.compile convert object to Joi object
    var _Joi$compile$validate = _joi["default"].compile(validSchema).validate(objectToValidate, {
        abortEarly: false,
        allowUnknown: true
      }),
      value = _Joi$compile$validate.value,
      error = _Joi$compile$validate.error;
    if (error) {
      var errorMessages = error.details.reduce(function (errorMessages, key) {
        errorMessages.push(key.message);
        return errorMessages;
      }, []);
      return next(new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, errorMessages));
    }
    Object.assign(req, value);
    return next();
  };
};
var validateToken = exports.validateToken = function validateToken(schema) {
  return function (req, res, next) {
    var checkToken = req.headers.authorization.split(' ');
    if (checkToken[0] === 'Bearer') {
      var token = checkToken[1]; // Joi.compile convert object to Joi object
      var _Joi$compile$validate2 = _joi["default"].compile(schema).validate(token, {
          abortEarly: false,
          allowUnknown: true
        }),
        value = _Joi$compile$validate2.value,
        error = _Joi$compile$validate2.error;
      if (error) {
        return next(new _ApiError["default"](_httpStatus["default"].UNAUTHORIZED, 'Invalid token'));
      }
    }
    return next();
  };
};