"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFileMiddleware = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerGridfsStorage = require("multer-gridfs-storage");
var _util = require("util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var storage = new _multerGridfsStorage.GridFsStorage({
  url: process.env.URIMONGODB,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  file: function file(req, _file) {
    var match = ["image/png", "image/jpeg"];
    if (match.indexOf(_file.mimetype) === -1) {
      var filename = "".concat(Date.now(), "-").concat(_file.originalname);
      return filename;
    }
    return {
      bucketName: 'photos',
      filename: "".concat(Date.now(), "-").concat(_file.originalname),
      metadata: {
        pageId: req.query.pageId
      }
    };
  }
});
var upload = (0, _multer["default"])({
  storage: storage
}).single('file');
var uploadFileMiddleware = exports.uploadFileMiddleware = (0, _util.promisify)(upload);