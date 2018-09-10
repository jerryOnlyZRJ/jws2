import Koa from "koa";
import bodyParser from "koa-bodyparser";
import assets from "koa-static";
import configure from "./config";
import errorHandler from "./middlewares/errorhandler";
import render from "koa-swig";
import co from "co";
import { Lifetime, createContainer } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";

const app = new Koa();
//  解析POST请求请求体
app.use(bodyParser());
const container = createContainer();
app.use(scopePerRequest(container));
container.loadModules([__dirname + "/services/*.js"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
});
errorHandler.error(app);
//  注册路由
app.use(
  loadControllers(__dirname + "/routers/*.js", {
    cwd: __dirname
  })
);

const CONFIG = configure(app);

app.use(assets(CONFIG.assetsPath));

app.context.render = co.wrap(
  render({
    root: CONFIG.viewsPath,
    autoescape: true,
    //  自定义模板匹配
    varControls: ["[[", "]]"],
    //   disable, set to false (配置缓存)
    cache: "memory",
    //   匹配模版类型
    ext: "html",
    writeBody: false
  })
);

app.listen(CONFIG.port, () => {
  // eslint-disable-next-line
  console.log(`website is starting at port ${CONFIG.port}`);
});

export default app;
