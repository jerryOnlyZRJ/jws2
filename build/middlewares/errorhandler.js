'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
  // log输出文件配置
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  // 错误类别配置
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

// 错误日志插件
const logger = _log4js2.default.getLogger('cheese');
const errorHandler = {
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
      logger.error('页面丢了');
      ctx.body = await ctx.render('404');
    });
  }
};
exports.default = errorHandler;