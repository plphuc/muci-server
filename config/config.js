"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var config = {
  port: process.env.PORT,
  uriMongoDB: process.env.URIMONGODB,
  accessTime: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  refreshTime: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  secret: process.env.JWT_SECRET
};
var _default = exports["default"] = config;
module.exports = exports.default;