"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awilixKoa = require("awilix-koa");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

let TestRouter = (_dec = (0, _awilixKoa.route)("/test"), _dec2 = (0, _awilixKoa.GET)(), _dec3 = (0, _awilixKoa.route)("/:id"), _dec4 = (0, _awilixKoa.GET)(), _dec5 = (0, _awilixKoa.route)("/testpost"), _dec6 = (0, _awilixKoa.POST)(), _dec(_class = (_class2 = class TestRouter {
  constructor({
    testService,
    userService
  }) {
    this.testService = testService;
    this.userService = userService;
  }

  async getTest(ctx) {
    const result = this.testService.find();
    ctx.body = await ctx.render("index/pages/index", {
      name: "Jerry",
      data: result
    });
  } //增加子路由


  async getUser(ctx) {
    // const result = await this.userService.getData()
    const id = ctx.params.id;
    ctx.body = await ctx.render("index/pages/index", {
      name: id,
      data: "test sub route"
    });
  }

  async testPost(ctx) {
    let options = ctx.request.body;
    ctx.body = await options;
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "getTest", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getTest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUser", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "getUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "testPost", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "testPost"), _class2.prototype)), _class2)) || _class);
var _default = TestRouter;
exports.default = _default;