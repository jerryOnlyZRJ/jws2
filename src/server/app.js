import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import assets from 'koa-static'
import CONFIG from './config'
import errorHandler from './middlewares/errorhandler'
import render from 'koa-swig'
import co from 'co'
import {
  Lifetime,
  createContainer
} from 'awilix'
import {
  loadControllers,
  scopePerRequest
} from 'awilix-koa'

const app = new Koa()
const container = createContainer()
app.use(scopePerRequest(container))
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})
errorHandler.error(app)
app.use(loadControllers(__dirname + '/routers/*.js', {
  cwd: __dirname
}))

app.use(assets(CONFIG.assetsPath))

app.context.render = co.wrap(render({
  root: CONFIG.viewsPath,
  autoescape: true,
  varControls: ['[[', ']]'], //自定义模板匹配
  cache: 'memory', // disable, set to false (配置缓存)
  ext: 'html', // 匹配模版类型
  writeBody: false
}))

app.listen(CONFIG.port, () => {
  console.log(`website is starting at port ${CONFIG.port}`)
})

export default app