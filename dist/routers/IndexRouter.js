"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

let IndexRouter = (_dec = (0, _awilixKoa.route)("/"), _dec2 = (0, _awilixKoa.route)("/index.html"), _dec3 = (0, _awilixKoa.GET)(), _dec(_class = _dec2(_class = (_class2 = class IndexRouter {
  constructor({
    userService
  }) {
    this.userService = userService;
  }

  async getIndex(ctx) {
    ctx.body = await ctx.render("index/pages/index", {
      data: "我是直出的页面",
      name: "Jerry"
    });
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getIndex", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "getIndex"), _class2.prototype)), _class2)) || _class) || _class);
var _default = IndexRouter;
exports.default = _default;