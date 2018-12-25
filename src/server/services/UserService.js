/**
 * @description index数据拉取模块
 * @author Jerry
 */
import request from "request-promise";
import cheerio from "cheerio";

/**
 * IndexModel类
 * @type {Class}
 */
class UserService {
  /**
   * 数据拉取方法
   * @return {Promise}
   */
  getData() {
    return request("http://www.baidu.com").then(data => {
      const $ = cheerio.load(data);
      return $(".mnav").text();
    });
  }
}

export default UserService;
