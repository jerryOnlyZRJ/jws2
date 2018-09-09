"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: _path.default.join(__dirname, '../logs/jwslog.log')
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

var _default = _log4js.default;
exports.default = _default;