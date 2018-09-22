// node api测试
const app = require('../dist/app.js').default
const request = require('supertest')

describe('test app.js', () => {
    test('test get /index', async() => {
        const res = await request(app.listen())
        .get('/index')
        .set('Accept', 'text/html')
        expect(res.headers['content-type']).toMatch(/html/)
        expect(res.status).toBe(200)
    })

    test('test get /api/data', async() => {
        const res = await request(app.listen())
        .get('/api/data')
        .set('Accept', 'application/json')
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.status).toBe(200)
        expect(res.body.data).toBe('新闻hao123地图视频贴吧')
    })

    test('test 404', async() => {
        const res = await request(app.listen()).get('/123')
        expect(res.headers['content-type']).toMatch(/html/)
        expect(res.status).toBe(404)
    })
})
