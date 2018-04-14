import Koa from 'koa'
import assets from 'koa-static'
import CONFIG from './config'
import errorHandler from './middlewares/errorhandler'
import render from 'koa-swig'
import co from 'co'
import { Lifetime, createContainer} from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'

const app = new Koa()
// 创建IoC容器
const container = createContainer()
//IoC实现，保证每一次的请求都是一个新实例
app.use(scopePerRequest(container))
// 装载所有的models并将其注入到routers
container.loadModules([__dirname + '/services/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})
// 容错处理必须放在路由分配之前
errorHandler.error(app)
//注册所有路由
app.use(loadControllers(__dirname + '/routers/*.js', { cwd: __dirname }))

// 配置静态资源
app.use(assets(CONFIG.assetsPath))

// 配置模版引擎
app.context.render = co.wrap(render({
    root: CONFIG.viewsPath,
    autoescape: true,
    varControls: ['[[', ']]'] ,    //自定义模板匹配
    cache: 'memory', // disable, set to false (配置缓存)
    ext: 'html', // 匹配模版类型
    writeBody: false
}))

// 端口监听
app.listen(CONFIG.port, () => {
    console.log(`website is starting at port ${CONFIG.port}`)
})

//导出koa2实例用于api测试
export default app