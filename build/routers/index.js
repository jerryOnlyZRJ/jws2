'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * index模块路由中间件对象
 * @type {Object}
 */
const indexRouters = {
  /**
   * index页面呈现接口
   * @return {async Function}
   */
  index() {
    return async (ctx, next) => {
      // ctx.router available
      ctx.body = await ctx.render('index', {
        name: 'Jerry',
        data: 'Welcome to koa'
      });
    };
  },
  /**
   * index模块数据拉取接口
   * @return {async Function}
   */
  data() {
    return async (ctx, next) => {
      const indexModelIns = new _models2.default();
      const data = await indexModelIns.getData();
      ctx.body = {
        data: data
      };
    };
  }
}; /**
    * @description index模块路由中间件
    * @author Jerry
    */
exports.default = indexRouters;