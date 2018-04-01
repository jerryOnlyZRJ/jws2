import log4js from 'log4js'
import fs from 'fs'
import CONFIG from '../config'

log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

// 错误日志插件
const logger = log4js.getLogger('cheese');
const errorHandler = {
    error(app) {
        app.use(async(ctx, next) => {
            try {
                await next()
            } catch(err) {
                // node错误日志
                logger.error(err)
                ctx.status = err.status || 500
                ctx.body = 500
            }
        })
        app.use(async(ctx, next) => {
            await next()
            if (404 != ctx.status) return
            ctx.status = 404
            logger.error('页面丢了')
            ctx.body = await fs.createReadStream(CONFIG['404Path']);
        })
    }
}
export default errorHandler