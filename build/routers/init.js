'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//项目路由初始化文件
const router = new _koaRouter2.default();

//index模块路由，对应index.js文件
router.get('/index', _index2.default.index());
router.get('/data', _index2.default.data());

//...其他模块路由

exports.default = router;