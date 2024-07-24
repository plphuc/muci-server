"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.errorConverter = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _ApiError = _interopRequireDefault(require("../utils/ApiError.js"));
var _httpStatus = _interopRequireDefault(require("http-status"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Convert error to ApiError
 * create message and  status code
 */
var errorConverter = exports.errorConverter = function errorConverter(err, req, res, next) {
  if (!(err instanceof _ApiError["default"])) {
    err.statusCode = err.statusCode || err.statusCode instanceof _mongoose["default"].Error ? err.statusCode : _httpStatus["default"].INTERNAL_SERVER_ERROR;
    err.message = err.message || _httpStatus["default"][err.statusCode];
  }
  var error = new _ApiError["default"](err.statusCode, err.message, false, err.stack);
  next(error);
};

/**
 * Handle error
 * Send status code, error message, stack trace to client
 */
var errorHandler = exports.errorHandler = function errorHandler(err, req, res, next) {
  var message = err.message,
    statusCode = err.statusCode,
    stack = err.stack;
  var response = {
    code: statusCode,
    message: message,
    stack: stack
  };
  res.status(statusCode).send(response);
};