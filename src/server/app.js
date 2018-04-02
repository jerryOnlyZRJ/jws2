import koa from 'koa'
import path from 'path'
import assets from 'koa-static'
import router from './routers/init'
import CONFIG from './config'
import errorHandler from './middlewares/errorhandler'
import render from 'koa-swig'
import co from 'co'


const app = new koa()

//配置静态资源
app.use(assets(path.join(__dirname, 'assets')))

//配置模版引擎
app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false (配置缓存)
    ext: 'html',    //匹配模版类型
    writeBody: false
}));

// 容错处理
// 容错机制必须放在路由分配之前
errorHandler.error(app)

// 路由分配
app.use(router.routes(), router.allowedMethods());

// 端口监听
app.listen(CONFIG.port, () => {
    console.log(`website is starting at port ${CONFIG.port}`)
});