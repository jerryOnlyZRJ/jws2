'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CONFIG = {
    "env": process.env.NODE_ENV, //"development", "production"
    "404Path": _path2.default.join(__dirname, '../views/404.html')
};
if (process.env.NODE_ENV === "development") {
    const localConfig = {
        port: 8081
    };
    CONFIG = _lodash2.default.extend(CONFIG, localConfig);
}
if (process.env.NODE_ENV === "production") {
    const prodConfig = {
        port: 80
    };
    CONFIG = _lodash2.default.extend(CONFIG, prodConfig);
}
exports.default = CONFIG;