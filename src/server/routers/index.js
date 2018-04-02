// index模块路由中间件执行函数
import IndexModel from '../models'

const indexRouters = {
  index () {
    return async (ctx, next) => {
      // ctx.router available
      ctx.body = await ctx.render('index', {
        name: 'Jerry',
        data: 'Welcome to koa'
      })
    }
  },
  data () {
    return async (ctx, next) => {
      const indexModelIns = new IndexModel()
      ctx.body = await indexModelIns.getData()
    }
  }
}

export default indexRouters
