const gulp = require('gulp')
const pump = require('pump')
const babel = require('gulp-babel')
const rollup = require('gulp-rollup')
const replace = require('rollup-plugin-replace')

gulp.task('builddev', cb => {
  pump([
    gulp.src(['src/server/**/*.js', 'src/server/app.js', '!src/server/views/*.js']), // '**'指所有文件夹，'*'指所有文件
    babel({
      babelrc: false,
      'plugins': ['transform-es2015-modules-commonjs', "transform-decorators-legacy"]
    }),
    gulp.dest('dist')
  ],
  cb
  )
})

gulp.task('watch', function () {
  gulp.watch(['src/server/**/*.js', 'src/server/app.js'], ['builddev']).on('change', () => {
    console.log('file is changed')
  })
})

gulp.task('buildprod', cb => {
  pump([
    gulp.src(['src/server/**/*.js', 'src/server/app.js']), // '**'指所有文件夹，'*'指所有文件
    babel({
      babelrc: false,
      ignore: ['src/server/config/index.js'],
      'plugins': ['transform-es2015-modules-commonjs', "transform-decorators-legacy"]
    }),
    rollup({
      output: {
        format: 'cjs'
      },
      input: ['src/server/config/index.js'],
      plugins: [
        // 替换rollup文件中的字符串
        // rollup不会读取变量中的值，只能显式替换字符串
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    }),
    gulp.dest('dist')
  ],
  cb
  )
})

let _task = ['builddev', 'watch']
if (process.env.NODE_ENV === 'production') {
  _task = ['buildprod']
}

gulp.task('default', _task)
