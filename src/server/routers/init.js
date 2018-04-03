/**
 * @description 项目路由初始化文件
 * @author Jerry
 */
import Router from 'koa-router'
import index from './index'

const router = new Router()

// index模块路由，对应index.js文件
router.get('/index', index.index())
router.get('/api/data', index.data())

// ...其他模块路由

export default router
