"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _handleError = require("./middlewares/handleError.js");
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = new _express["default"]();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());

// for parsing application/xwww-form-urlencoded
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/', _index["default"]);

// convert error to ApiError
app.use(_handleError.errorConverter);
// handle error
app.use(_handleError.errorHandler);
var _default = exports["default"] = app;
module.exports = exports.default;