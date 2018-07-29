const pluginName = 'htmlAfterWebpackPlugin';
const assetsHelp = data => {
    let css = []
    let js = []
    const dir = {
        js: item => `<script src="${item}"></script>`,
        css: item => `<link rel="stylesheet" href="${item}">`
    }
    for (let jsItem of data.js) {
        js.push(dir.js(jsItem))
    }
    for (let cssItem of data.css) {
        css.push(dir.css(cssItem))
    }
    return {
        css,
        js
    }
}

// webpack4
// 注册：
// compiler.hooks.[somehooks].tap([yourPluginName],callback)
// 触发：
// compiler.hooks.[somehooks].call()

class htmlAfterWebpackPlugin {
    apply(compiler) {
        // html-webpack-plugin-before-html-processing
        // console.log(compiler)
        compiler.hooks.compilation.tap(pluginName, compilation => {
            //监听pluginName，运行时触发，向回调注入compilation
            // console.log('*****compilation*****', compilation)
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData => {
                // console.log('*****htmlPluginData*****', htmlPluginData)
                let _html = htmlPluginData.html
                const result = assetsHelp(htmlPluginData.assets)
                _html = _html.replace('<!--injectcss-->', result.css.join(''))
                _html = _html.replace('<!--injectjs-->', result.js.join(''))
                htmlPluginData.html = _html
            })
        });
    }
}

// webpack3
// 注册：
// compiler.plugin([somehooks],callback)
// 触发：
// compilitation.applyPlugins([somehooks],params)

// class htmlAfterWebpackPlugin {
//     apply(compiler) {
//         compiler.plugin('compilation', (compilation) => {
//             compilation.plugin(
//                 'html-webpack-plugin-before-html-processing',
//                 (htmlPluginData, cb) => {
//                     let _html = htmlPluginData.html
//                     const result = assetsHelp(htmlPluginData.assets)
//                     _html = _html.replace('<!--injectcss-->', result.css.join(''))
//                     _html = _html.replace('<!--injectjs-->', result.js.join(''))
//                     htmlPluginData.html = _html
//                     cb(null, htmlPluginData)
//                 }
//             )
//         })
//     }
// }

module.exports = htmlAfterWebpackPlugin