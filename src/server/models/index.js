import request from 'request-promise'
import cheerio from 'cheerio'

class IndexModel {
  constructor () {}
  getData () {
    return request('http://www.baidu.com').then(data => {
      const $ = cheerio.load(data)
      return $('.mnav').text()
    })
  }
}

export default IndexModel
