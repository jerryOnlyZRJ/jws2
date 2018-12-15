import log4js from "log4js";
import path from "path";

log4js.configure({
  // 定义输出形式
  appenders: {
    cheese: {
      type: "file",
      filename: path.join(__dirname, "../logs/jwslog.log")
    },
    out: {
      type: "stdout",
      layout: {
        type: "basic"
      }
    }
  },
  // 定义分组，可以拼凑不同的输出格式
  // 供log4js.getLogger()函数选择
  categories: {
    default: {
      appenders: ["out"],
      level: "error"
    },
    mix: {
      appenders: ["cheese", "out"],
      level: "error"
    }
  },
  pm2: true // 如果使用 pm2 -i 方式启动的 node 进程需要设置次为 true
});

export default log4js;
