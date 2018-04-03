/**
 * @description index模块路由中间件
 * @author Jerry
 */
import IndexModel from '../models'

/**
 * index模块路由中间件对象
 * @type {Object}
 */
const indexRouters = {
  /**
   * index页面呈现接口
   * @return {async Function}
   */
  index () {
    return async (ctx, next) => {
      // ctx.router available
      ctx.body = await ctx.render('index', {
        name: 'Jerry',
        data: 'Welcome to koa'
      })
    }
  },
  /**
   * index模块数据拉取接口
   * @return {async Function}
   */
  data () {
    return async (ctx, next) => {
      const indexModelIns = new IndexModel()
      const data = await indexModelIns.getData()
      ctx.body = {
        data: data
      }
    }
  }
}

export default indexRouters
