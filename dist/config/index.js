"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description node层配置文档
 * @author Jerry
 */

/**
 * node配置对象
 * @type {Object}
 */
let CONFIG = {
  env: process.env.NODE_ENV,
  // "development", "production"
  viewsPath: _path.default.join(__dirname, "../views"),
  assetsPath: _path.default.join(__dirname, "../assets")
}; // eslint-disable-next-line

const init = app => {
  if (process.env.NODE_ENV === "production") {
    const prodConfig = {
      port: 80
    };
    CONFIG = _lodash.default.extend(CONFIG, prodConfig);
  } else {
    const localConfig = {
      port: 8081
    };
    CONFIG = _lodash.default.extend(CONFIG, localConfig);
  }

  return CONFIG;
};

var _default = app => init(app);

exports.default = _default;