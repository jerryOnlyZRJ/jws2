"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _cheerio = _interopRequireDefault(require("cheerio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description index数据拉取模块
 * @author Jerry
 */

/**
 * IndexModel类
 * @type {Class}
 */
class UserService {
  /**
   * 数据拉取方法
   * @return {Promise}
   */
  getData() {
    return (0, _requestPromise.default)('http://www.baidu.com').then(data => {
      const $ = _cheerio.default.load(data);

      return $('.mnav').text();
    });
  }

}

var _default = UserService;
exports.default = _default;