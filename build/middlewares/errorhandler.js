'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

// 错误日志插件
const logger = _log4js2.default.getLogger('cheese');
const errorHandler = {
    error(app) {
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
            if (404 != ctx.status) return;
            ctx.status = 404;
            logger.error('页面丢了');
            ctx.body = await _fs2.default.createReadStream(_config2.default['404Path']);
        });
    }
};
exports.default = errorHandler;