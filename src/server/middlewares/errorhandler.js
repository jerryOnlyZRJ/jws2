/**
 * @description 容错机制中间件
 * @author Jerry
 */
import log4js from 'log4js'
import CONFIG from '../config'

log4js.configure({
  // log输出文件配置
  appenders: { cheese: { type: 'file', filename: './logs/jwslog.log' } },
  // 错误类别配置
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese')

/**
 * 容错处理对象
 * @type {Object}
 */
const errorHandler = {
  /**
   * 错误处理句柄
   * @param  {Object} app koa2上下文
   */
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
      ctx.body = await ctx.render('404')
    })
  }
}
export default errorHandler
