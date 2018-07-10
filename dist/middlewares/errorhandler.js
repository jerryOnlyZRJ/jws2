'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
  // log输出文件配置
  appenders: {
    cheese: {
      type: 'file',
      filename: _path2.default.resolve(__dirname, '../logs/jwslog.log')
    }
  },
  // 错误类别配置
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
}); /**
     * @description 容错机制中间件
     * @author Jerry
     */

const logger = _log4js2.default.getLogger('cheese');

/**
 * 容错处理对象
 * @type {Object}
 */
const errorHandler = {
  /**
   * 错误处理句柄
   * @param  {Object} app koa2上下文
   */
  error(app) {
    // 配合中间件迭代器进行容错处理
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // node错误日志
        logger.error(err);
        ctx.status = err.status || 500;
        ctx.body = 500;
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status !== 404) return;
      ctx.status = 404;
      ctx.body = await ctx.render('common/404');
    });
  }
};
exports.default = errorHandler;