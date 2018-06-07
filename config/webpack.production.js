const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    output: {
        filename: 'scripts/[name].[hash:5].js'
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].[hash:5].css")
    ]
}