import log4js from 'log4js'
import path from 'path'

log4js.configure({
	appenders: {
		cheese: {
			type: 'file',
			filename: path.join(__dirname, '../logs/jwslog.log')
		}
	},
	categories: {
		default: {
			appenders: ['cheese'],
			level: 'error'
		}
	}
})

export default log4js