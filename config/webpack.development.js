const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    plugins: [
        new ExtractTextPlugin("styles/[name].bundle.css")
    ]
}