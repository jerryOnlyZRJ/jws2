'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class indexModel {
    constructor() {}
    getData() {
        return (0, _requestPromise2.default)('http://www.baidu.com').then(data => {
            const $ = _cheerio2.default.load(data);
            return $('.mnav').text();
        });
    }
}

exports.default = indexModel;