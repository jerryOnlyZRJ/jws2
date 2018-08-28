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

//雪碧图配置
const SpritesmithPlugin = require('webpack-spritesmith')
//拿到存放雪碧图的所有文件夹
const spritesDirs = glob.sync('./src/client/assets/sprites/*')
const spritesPlugins = spritesDirs.map(spritesDir => {
    //拿到单个文件夹名称
    let dirName = basename(spritesDir)
    return new SpritesmithPlugin({
        src: {
            // 图片所在文件夹（无视子文件夹）
            cwd: resolve(spritesDir),
            // 匹配 png 文件，可以用glob语法，比如 '*.(png|jpg)' 这样
            // PS：png和jpg拼一起，有时候图片无法正常显示
            glob: '*.png'
        },
        // 输出雪碧图文件及样式文件
        target: {
            // 将其输出到 src/assets 目录下
            // 这个是打包前的目录，所以不要学某个教程将其输出到 dist 目录下
            image: resolve(`src/client/assets/images/sprites/${dirName}.png`),
            // 可以是字符串、或者数组
            css: resolve(`src/client/assets/styles/sprites/${dirName}.css`)
        },
        apiOptions: {
            generateSpriteName: function() {
                const fileName = arguments[0].match(/[^\\]+$/)[0].replace(/\.[a-zA-Z]+/, '')
                // 雪碧图每个元素生成的类名：.icon-dirname-filename
                // console.log(`icon-${dirName}-${fileName}`)
                return `${dirName}-${fileName}`
            },
            // 简单来说，这个就是雪碧图的 css 文件怎么找到 雪碧图的 png 文件
            cssImageRef: `../../images/sprites/${dirName}.png`
        },
        spritesmithOptions: {
            // 这个是雪碧图的排列顺序（从上到下）
            algorithm: 'left-right', // or top-down
            // 雪碧图里，图片和图片的距离，单位是px
            padding: 20
        },
        //自动适配视网膜二倍屏
        retina: '@2x'
        // {
        //   classifier: imagePath => {
        //     console.log('------------>', imagePath)
        //     const fileName = imagePath.match(/[^\\]+$/)[0].replace(/\.[a-zA-Z]+/, '')
        //     function splitExt(fileName) => {
        //          const extInd = fileName.lastIndexOf('.');
        //           return {
        //               name: fileName.slice(0, extInd),
        //                ext: fileName.slice(extInd)
        //            };
        //       };
        //     const parsed = splitExt(imagePath);
        //     var suffix = '@2x'
        //     if (/@2x$/.test(fileName)) {
        //       return {
        //         type: 'retina',
        //         normalName: parsed.name.slice(0, -suffix.length) + parsed.ext,
        //         retinaName: imagePath
        //       }
        //     } else {
        //       return {
        //         type: 'normal',
        //         normalName: imagePath,
        //         retinaName: parsed.name + suffix + parsed.ext
        //       }
        //     }
        //   },
        //   targetImage: path.resolve(__dirname, `../src/style/images/sprites/${dir}@2x.png`),
        //   cssImageRef: `../../images/sprites/${dir}@2x.png`
        // }
    })
})


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
        ...spritesPlugins,
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