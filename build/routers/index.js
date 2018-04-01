"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexRouters = {
    index() {
        return (ctx, next) => {
            // ctx.router available
            ctx.body = "This in index!";
        };
    },
    data() {
        return async (ctx, next) => {
            const indexModelIns = new _models2.default();
            ctx.body = await indexModelIns.getData();
        };
    }
}; // index模块路由中间件执行函数
exports.default = indexRouters;