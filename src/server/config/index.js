/**
 * @description node层配置文档
 * @author Jerry
 */
import _ from "lodash";
import path from "path";

/**
 * node配置对象
 * @type {Object}
 */
let CONFIG = {
  env: process.env.NODE_ENV, // "development", "production"
  viewsPath: path.join(__dirname, "../views"),
  assetsPath: path.join(__dirname, "../assets")
};

// eslint-disable-next-line
const init = app => {
  if (process.env.NODE_ENV === "production") {
    const prodConfig = {
      port: 80
    };
    CONFIG = _.extend(CONFIG, prodConfig);
  } else {
    const localConfig = {
      port: 8081
    };
    CONFIG = _.extend(CONFIG, localConfig);
  }
  return CONFIG;
};

export default app => init(app);
