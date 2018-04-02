import log4js from 'log4js'
import CONFIG from '../config'

log4js.configure({
  // log输出文件配置
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  // 错误类别配置
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})

// 错误日志插件
const logger = log4js.getLogger('cheese')
const errorHandler = {
  error (app) {
    // 配合中间件迭代器进行容错处理
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        // node错误日志
        logger.error(err)
        ctx.status = err.status || 500
        ctx.body = 500
      }
    })
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status !== 404) return
      ctx.status = 404
      logger.error('页面丢了')
      ctx.body = await ctx.render('404')
    })
  }
}
export default errorHandler
