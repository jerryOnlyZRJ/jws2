module.exports = {
	plugins: {
		'postcss-preset-env': {
			stage: 0
		},
		"autoprefixer": {
			browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20', 'iOS >=7']
		},
		'cssnano': {}
	}
}