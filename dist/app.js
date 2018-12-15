"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _config = _interopRequireDefault(require("./config"));

var _errorhandler = _interopRequireDefault(require("./middlewares/errorhandler"));

var _koaSwig = _interopRequireDefault(require("koa-swig"));

var _co = _interopRequireDefault(require("co"));

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default(); //  解析POST请求请求体并自动挂载在ctx.request.body上

app.use((0, _koaBodyparser.default)());
const container = (0, _awilix.createContainer)();
app.use((0, _awilixKoa.scopePerRequest)(container));
container.loadModules([__dirname + "/services/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});

_errorhandler.default.error(app); //  注册路由


app.use((0, _awilixKoa.loadControllers)(__dirname + "/routers/*.js", {
  cwd: __dirname
}));
const CONFIG = (0, _config.default)(app);
app.use((0, _koaStatic.default)(CONFIG.assetsPath));
app.context.render = _co.default.wrap((0, _koaSwig.default)({
  root: CONFIG.viewsPath,
  autoescape: true,
  //  自定义模板匹配
  varControls: ["[[", "]]"],
  //   disable, set to false (配置缓存)
  cache: "memory",
  //   匹配模版类型
  ext: "html",
  writeBody: false
}));
app.listen(CONFIG.port, () => {
  // eslint-disable-next-line
  console.log(`website is starting at port ${CONFIG.port}`);
}); //到处app供API集成测试使用

var _default = app;
exports.default = _default;