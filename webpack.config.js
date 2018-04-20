const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const glob = require('glob')
const files = glob.sync('./src/client/views/**/*.entry.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { join, basename } = require('path')
let _entry = {}
const fileReg = /\/(\w+-\w+)(\.entry\.js)$/
for (let item of files) {
    item.replace(fileReg, (match, $1) => {
        _entry[$1] = item
    })
}
const _mergeConfig = require(`./config/webpack.${argv.mode}.js`)
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
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader'
                ]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/assets/*'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
    ]
}
module.exports = merge(_localConfig, _mergeConfig)