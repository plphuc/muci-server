"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _token = _interopRequireDefault(require("../config/token.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var tokenSchema = _mongoose["default"].Schema({
  token: {
    type: String,
    index: true,
    required: true
  },
  user: {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    "enum": [_token["default"].REFRESH, _token["default"].RESET_PASSWORD, _token["default"].VERIFY_EMAIL]
  },
  expire: {
    type: Date,
    required: true
  }
}, {
  timestamp: true
});
var Token = _mongoose["default"].model('Token', tokenSchema);
var _default = exports["default"] = Token;
module.exports = exports.default;