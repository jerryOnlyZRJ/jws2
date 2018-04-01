import _ from 'lodash'
import path from 'path'

let CONFIG = {
    "env": process.env.NODE_ENV, //"development", "production"
    "404Path": path.join(__dirname, '../views/404.html')
}
if (process.env.NODE_ENV === "development") {
    const localConfig = {
        port: 8081
    }
    CONFIG = _.extend(CONFIG, localConfig)
}
if (process.env.NODE_ENV === "production") {
    const prodConfig = {
        port: 80
    }
    CONFIG = _.extend(CONFIG, prodConfig)
}
export default CONFIG