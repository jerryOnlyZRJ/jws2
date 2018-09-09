const gulp = require('gulp')
const pump = require('pump')
const babel = require('gulp-babel')
const rollup = require('gulp-rollup')
const replace = require('rollup-plugin-replace')
const sourcemaps = require('gulp-sourcemaps')
const eslint = require('gulp-eslint');
const gulpSequence = require('gulp-sequence')

gulp.task('builddev', cb => {
  pump([
    gulp.src(['src/server/**/*.js', 'src/server/app.js', '!src/server/views/*.js']), // '**'指所有文件夹，'*'指所有文件
    babel({
      babelrc: false,
      'plugins': ['@babel/plugin-transform-modules-commonjs',
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    }),
    gulp.dest('dist')
  ],
    cb
  )
})

gulp.task('watch', () => {
  gulp.watch(['src/server/**/*.js', 'src/server/app.js'], gulp.parallel(['builddev'])).on('change', () => {
    console.log('file is changed')
  })
})

gulp.task('buildprod', cb => {
  pump([
    gulp.src(['src/server/**/*.js', 'src/server/app.js']), // '**'指所有文件夹，'*'指所有文件
    babel({
      babelrc: false,
      ignore: ['src/server/config/index.js'],
      'plugins': ['@babel/plugin-transform-modules-commonjs',
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
      ]
    }),
    // 清洗config
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
    gulp.src('./src/server/pm2.json'),
    gulp.dest('dist')
  ],
    cb
  )
})

gulp.task('lint', cb => {
  pump([
    gulp.src('./src/nodeuii/**/*.js'),
    eslint(),
    eslint.format(),
    eslint.failAfterError()
  ],
    cb
  )
})

let _task = ['builddev', 'watch']
if (process.env.NODE_ENV === 'production') {
  _task = ['lint', 'buildprod']
}
if (process.env.NODE_ENV === "lint") {
  _task = ["lint"];
}

gulp.task('default', gulp.series(_task))