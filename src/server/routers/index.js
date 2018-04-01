// index模块路由中间件执行函数
import indexModel from '../models'

const indexRouters = {
    index() {
        return (ctx, next) => {
            // ctx.router available
            ctx.body = "This in index!"
        }
    },
    data() {
        return async(ctx, next) => {
            const indexModelIns = new indexModel()
            ctx.body = await indexModelIns.getData()
        }
    }
}

export default indexRouters