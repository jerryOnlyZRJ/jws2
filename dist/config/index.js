'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var path = _interopDefault(require('path'));

/**
 * @description node层配置文档
 * @author Jerry
 */
/**
 * node配置对象
 * @type {Object}
 */
let CONFIG = {
  env: "production", // "development", "production"
  viewsPath: path.join(__dirname, "../views"),
  assetsPath: path.join(__dirname, "../assets")
};

// eslint-disable-next-line
const init = app => {
  {
    const prodConfig = {
      port: 80
    };
    CONFIG = _.extend(CONFIG, prodConfig);
  }
  return CONFIG;
};

var index = app => init(app);

module.exports = index;
