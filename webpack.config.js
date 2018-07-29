const {
    join,
    basename,
    resolve
} = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const glob = require('glob')
const entries = glob.sync('./src/client/views/**/*.entry.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlAfterWebpackPlugin = require('./config/htmlAfterWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 代码压缩插件
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
let _entry = {}
const fileReg = /\/(\w+-\w+)(\.entry\.js)$/
for (let item of entries) {
    item.replace(fileReg, (match, $1) => {
        _entry[$1] = item
    })
}
let _localConfig = {
    mode: _mode,
    entry: _entry,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: '/',
        filename: "scripts/[name].bundle.js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                _mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss'
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name]-[hash:5].[ext]'
                }
            }]
        }]
    },
    resolve: {
        extensions: [".js", ".css", ".vue"],
        alias: {
            '@': resolve('src')
        }
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
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash:5].css',
            chunkFilename: 'styles/[id].[hash:5].css',
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index/pages/index.html',
            template: __dirname + '/src/client/views/index/pages/index.html',
            inject: false
        }),
        new htmlAfterWebpackPlugin(),
    ]
}
module.exports = merge(_localConfig, _mergeConfig)