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
  if (process.env.NODE_ENV === "development") {
    const localConfig = {
      port: 8081
    };
    CONFIG = _lodash.default.extend(CONFIG, localConfig); // const webpack = require('webpack');
    // const devConfig = require('../../webpack.config.js');
    // const compile = webpack(devConfig);
    // const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
    // app.use(devMiddleware(compile, {
    //   // display no info to console (only warnings and errors)
    //   noInfo: false,
    //   // display nothing to the console
    //   quiet: false,
    //   // switch into lazy mode
    //   // that means no watching, but recompilation on every request
    //   lazy: false,
    //   // watch options (only lazy: false)
    //   watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: true
    //   },
    //   // public path to bind the middleware to
    //   // use the same as in webpack
    //   publicPath: "/",
    //   // custom headers
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   },
    //   // options for formating the statistics
    //   stats: {
    //     colors: true
    //   }
    // }))
    // app.use(hotMiddleware(compile, {
    //   log: console.log,
    //   path: '/__webpack_hmr',
    //   heartbeat: 10 * 1000
    // }))
  }

  if (process.env.NODE_ENV === "production") {
    const prodConfig = {
      port: 80
    };
    CONFIG = _lodash.default.extend(CONFIG, prodConfig);
  }

  return CONFIG;
};

var _default = app => init(app);

exports.default = _default;