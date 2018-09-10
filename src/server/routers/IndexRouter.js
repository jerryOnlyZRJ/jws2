import { route, GET } from "awilix-koa";

@route("/")
@route("/index.html")
class IndexRouter {
  constructor({ userService }) {
    this.userService = userService;
  }

  @GET()
  async getIndex(ctx) {
    ctx.body = await ctx.render("index/pages/index", {
      data: "我是直出的页面",
      name: "Jerry"
    });
  }
}

export default IndexRouter;
