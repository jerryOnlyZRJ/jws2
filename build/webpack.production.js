const CopyWebpackPlugin = require('copy-webpack-plugin')
// 代码压缩插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 优化html，自动压缩并修复缺失标签
const { minify } = require('html-minifier')
// webapck深度tree-shaking
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
// 注入runtime.js
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

module.exports = {
  output: {
    filename: 'scripts/[name].[hash:5].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'common/vendor', // 打包后的文件名，任意命名    
          priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        utils: { // 抽离自定义公共代码
          test: /\.js$/,
          chunks: 'initial',
          name: 'common/utils',
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    },
    runtimeChunk: { name: 'common/runtime' },
    // js,css资源压缩
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        // 多核压缩，提升效率
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // new InlineManifestWebpackPlugin('common/runtime'),
    new WebpackDeepScopeAnalysisPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/client/views/common/layout.html',
      to: '../views/common/layout.html'
    }, {
      from: 'src/client/views/common/404.html',
      to: '../views/common/404.html'
    }, {
      from: 'src/client/components/',
      to: '../components',
      transform(content, path) {
        return minify(content.toString('utf-8'), {
          // 去空格
          collapseWhitespace: true
        });
      }
    }], {
        ignore: ['*.js', '*.css'],
      }),
  ]
}