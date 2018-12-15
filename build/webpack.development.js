const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/client/views/common/layout.html',
            to: '../views/common/layout.html'
        }, {
            from: 'src/client/views/common/404.html',
            to: '../views/common/404.html'
        }, {
            from: 'src/client/components/',
            to: '../components',
        }], {
                copyUnmodified: true,
                ignore: ['*.js', '*.css'],
            }),
    ]
}