'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _errorhandler = require('./middlewares/errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
// 创建IoC容器
const container = (0, _awilix.createContainer)();
//IoC实现，保证每一次的请求都是一个新实例
app.use((0, _awilixKoa.scopePerRequest)(container));
// 装载所有的models并将其注入到routers
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: _awilix.Lifetime.SCOPED
    }
});
// 容错处理必须放在路由分配之前
_errorhandler2.default.error(app);
//注册所有路由
app.use((0, _awilixKoa.loadControllers)(__dirname + '/routers/*.js', { cwd: __dirname }));

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

// 端口监听
app.listen(_config2.default.port, () => {
    console.log(`website is starting at port ${_config2.default.port}`);
});

//导出koa2实例用于api测试
exports.default = app;