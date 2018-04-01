'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _init = require('./routers/init');

var _init2 = _interopRequireDefault(_init);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorhandler = require('./middlewares/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();

//配置静态资源
app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, 'assets')));

// 容错处理
_errorhandler2.default.error(app);

// 路由分配
app.use(_init2.default.routes(), _init2.default.allowedMethods());

// 端口监听
app.listen(_config2.default.port, () => {
    console.log(`website is starting at port ${_config2.default.port}`);
});