const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const glob = require('glob')
const files = glob.sync('./src/client/views/**/*.entry.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { join, basename } = require('path')
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
let _entry = {}
const fileReg = /\/(\w+-\w+)(\.entry\.js)$/
for (let item of files) {
    item.replace(fileReg, (match, $1) => {
        _entry[$1] = item
    })
}
let _localConfig = {
    entry: _entry,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: '/',
        filename: "scripts/[name].bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/assets/*', 'dist/views/*'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([{
            from: 'src/client/views/common/layout.html',
            to: '../views/common/layout.html'
        }, {
            from: 'src/client/views/common/404.html',
            to: '../views/common/404.html'
        }]),
        new HtmlWebpackPlugin({
            filename: '../views/index/pages/index.html',
            template: __dirname + '/src/client/views/index/pages/index.html',
            inject: false
        }),
        new htmlAfterWebpackPlugin()
    ]
}
module.exports = merge(_localConfig, _mergeConfig)