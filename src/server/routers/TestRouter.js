import { route, GET, POST } from "awilix-koa";

@route("/test")
class TestRouter {
  constructor({ testService, userService }) {
    this.testService = testService;
    this.userService = userService;
  }

  @GET()
  async getTest(ctx) {
    const result = this.testService.find();
    ctx.body = await ctx.render("index/pages/index", {
      name: "Jerry",
      data: result
    });
  }

  //增加子路由
  @route("/:id")
  @GET()
  async getUser(ctx) {
    // const result = await this.userService.getData()
    const id = ctx.params.id;
    ctx.body = await ctx.render("index/pages/index", {
      name: id,
      data: "test sub route"
    });
  }

  @route("/testpost")
  @POST()
  async testPost(ctx) {
    let options = ctx.request.body;
    ctx.body = await options;
  }
}

export default TestRouter;
