const {
    join,
    basename,
    resolve
} = require('path')
const globProjectConfig = require('./config/projectConfig.js')
const argv = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const glob = require('glob')
const entries = glob.sync('./src/client/views/**/*.entry.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const htmlAfterWebpackPlugin = require('./build/webpackPlugins/htmlAfterWebpackPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 图片压缩插件
const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');

// CSS tree-shaking
// const PurifyCSSPlugin = require('purifycss-webpack');

// webpack构建性能监控(与html-webpack-plugin不兼容)
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 文件变更Map
const ManifestPlugin = require('webpack-manifest-plugin');

const HappyPack = require('happypack');
//使用自定义happypack配置
// const happypackConfig = require('./build/happypack.js')

// 生成多页entry及htmlplugin
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./build/webpack.${_mode}.js`);
let _entry = {}
let _htmlPlugins = []
const fileReg = /\/(\w+-\w+)(\.entry\.js)$/
for (let item of entries) {
    if (fileReg.test(item)) {
        const entrykey = RegExp.$1
        _entry[entrykey] = item;
        const [dist, template] = entrykey.split("-");
        _htmlPlugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/client/views/${dist}/pages/${template}.html`,
            chunks: ["common/runtime", "common/vendor", "common/utils", entrykey],
            minify: {
                removeComments: true,
                collapseWhitespace: _modeflag,
                removeAttributeQuotes: _modeflag
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            inject: false
        }))
    }
}

// iterm2彩蛋
const setIterm2Badge = require('set-iterm2-badge');
const port = 'Ranjay build client...';
setIterm2Badge(port);

//雪碧图配置
const SpritesmithPlugin = require('webpack-spritesmith')
//拿到存放雪碧图的所有文件夹
const spritesDirs = glob.sync('./src/client/assets/sprites/*')
const spritesPlugins = spritesDirs.map(spritesDir => {
    //拿到单个文件夹名称 basename('./src/client/assets/sprites/common')
    let dirName = basename(spritesDir)
    return new SpritesmithPlugin({
        src: {
            // 图片所在文件夹（无视子文件夹）
            cwd: resolve(__dirname, spritesDir),
            // 匹配 png 文件，可以用glob语法，比如 '*.(png|jpg)' 这样
            // PS：png和jpg拼一起，有时候图片无法正常显示
            glob: '*.png'
        },
        // 输出雪碧图文件及样式文件
        target: {
            // 将其输出到 src/assets 目录下
            // 这个是打包前的目录，所以不要学某个教程将其输出到 dist 目录下
            image: resolve(__dirname, `src/client/assets/images/sprites/${dirName}.png`),
            // 可以是字符串、或者数组
            css: resolve(__dirname, `src/client/assets/styles/sprites/${dirName}.css`)
        },
        apiOptions: {
            // 生成iconfont class名称
            generateSpriteName: function () {
                const imagePath = arguments[0]
                const basenameIndex = imagePath.lastIndexOf('\\') >= 0 ? imagePath.lastIndexOf('\\') : imagePath.lastIndexOf('/')
                const fileName = imagePath.substr(basenameIndex + 1, imagePath.length)
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

// 全局配置
let _localConfig = {
    mode: _mode,
    entry: _entry,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: globProjectConfig.publicPath,
        filename: "scripts/[name].bundle.js"
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'code-metrics-loader',
                options: {
                    errorLimit: 5
                }
            }],
        }, {
            test: /\.js|\.jsx$/,
            exclude: /node_modules/,
            // id与plugins中的插件实例相关联
            use: 'happypack/loader?id=babel',
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            // loader的执行顺序与声明时是相反的，从后往前
            use: [
                !_modeflag ? 'style-loader' : MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        // modules: true,
                        // name:文件名；local:类名；
                        // localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss'
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
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
            '@': resolve('src/client')
        }
    },
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
        new ProgressBarPlugin(),
        new HappyPack({
            id: 'babel',
            loaders: [{
                loader: 'babel-loader',
            }]
        }),
        new ManifestPlugin({
            fileName: '../manifest.json'
        }),
        new tinyPngWebpackPlugin({
            key: globProjectConfig.tinyPngPrivateKey, //can be Array, eg:['your key 1','your key 2'....]
            ext: ['png', 'jpeg', 'jpg'], //img ext name
            // proxy:'http://user:pass@192.168.0.1:8080' //http proxy,eg:如果你来自中国，同时拥有shadowsocks，翻墙默认配置为 http:127.0.0.1:1080 即可。（注，该参数因为需要超时断开连接的原因，导致最后会延迟执行一会webpack。但相对于国内网络环境，用此参数还是非常划算的，测试原有两张图片，无此参数耗时2000ms+，有此参数耗时1000ms+节约近半。）
        }),
        ...spritesPlugins,
        new CleanWebpackPlugin(['dist/assets/*', 'dist/views/*'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash:5].css',
        }),
        // CSS tree-shaking
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, 'dist/views/*.html')),
        // }),
        ..._htmlPlugins,
        new htmlAfterWebpackPlugin(),
    ]
}

const webpackConfig = merge(_localConfig, _mergeConfig)
// const webpackConfig = smp.wrap(merge(_localConfig, _mergeConfig))

module.exports = webpackConfig