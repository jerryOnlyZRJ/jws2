"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _log4js = _interopRequireDefault(require("log4js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js.default.configure({
  // 定义输出形式
  appenders: {
    cheese: {
      type: "file",
      filename: _path.default.join(__dirname, "../logs/jwslog.log")
    },
    out: {
      type: "stdout",
      layout: {
        type: "basic"
      }
    }
  },
  // 定义分组，可以拼凑不同的输出格式
  // 供log4js.getLogger()函数选择
  categories: {
    default: {
      appenders: ["out"],
      level: "error"
    },
    mix: {
      appenders: ["cheese", "out"],
      level: "error"
    }
  },
  pm2: true // 如果使用 pm2 -i 方式启动的 node 进程需要设置次为 true

});

var _default = _log4js.default;
exports.default = _default;