import koa from 'koa'
import path from 'path'
import assets from 'koa-static'
import router from './routers/init'
import CONFIG from './config'
import errorHandler from './middlewares/errorhandler'

const app = new koa()

//配置静态资源
app.use(assets(path.join(__dirname, 'assets')))

// 容错处理
errorHandler.error(app)

// 路由分配
app.use(router.routes(), router.allowedMethods());

// 端口监听
app.listen(CONFIG.port, () => {
    console.log(`website is starting at port ${CONFIG.port}`)
});