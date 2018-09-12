const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    // 获取用户配置的options
    const options = loaderUtils.getOptions(this);
    // 开启loader资源缓存
    this.cacheable();
    marked.setOptions(options);
    return marked(markdown);
};