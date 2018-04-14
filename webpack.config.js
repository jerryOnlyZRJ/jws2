const argv = require('yargs-parser')(process.argv.slice(2))
console.log(argv.mode)
const merge = require('webpack-merge')
const glob = require('glob')
const files = glob.sync('./src/client/views/**/*.entry.js')
console.log(files)
const _mergeConfig = require(`./config/webpack.${argv.mode}.js`)
let _localConfig = {

}
module.exports = merge(_mergeConfig, _localConfig)