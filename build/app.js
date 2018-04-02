'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _init = require('./routers/init');

var _init2 = _interopRequireDefault(_init);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorhandler = require('./middlewares/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

// 配置静态资源
app.use((0, _koaStatic2.default)(_config2.default.assetsPath));

// 配置模版引擎
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewsPath,
    autoescape: true,
    varControls: ['[[', ']]'], //自定义模板匹配
    cache: 'memory', // disable, set to false (配置缓存)
    ext: 'html', // 匹配模版类型
    writeBody: false
}));

// 容错处理
// 容错机制必须放在路由分配之前
_errorhandler2.default.error(app);

// 路由分配
app.use(_init2.default.routes(), _init2.default.allowedMethods());

// 端口监听
app.listen(_config2.default.port, () => {
    console.log(`website is starting at port ${_config2.default.port}`);
});