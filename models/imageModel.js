"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var imageSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
});
var Image = _mongoose["default"].model('Image', imageSchema);
var _default = exports["default"] = Image;
module.exports = exports.default;