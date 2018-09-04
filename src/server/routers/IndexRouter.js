import {
    route,
    GET,
    POST,
    before
} from 'awilix-koa'

@route('/')
@route('/index.html')
export default class IndexRouter {
    constructor({
        userService
    }) {
        this.userService = userService
    }

    @GET()
    async getIndex(ctx, next) {
        ctx.body = await ctx.render('index/pages/index', {
            data: "我是直出的页面",
            name: 'Jerry'
        });
    }
}