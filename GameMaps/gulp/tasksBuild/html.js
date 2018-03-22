const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.base}/**/*.html`)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
        return {
          'title': 'HTML Build Fail',
          'subtitle': 'Check the Console Window',
          'message': err.message,
          "sound": 'Pulse',
          'onLast': true,
        }
      })
    }))
    .pipe($.newer(global.paths.build.html))
    .pipe($.if(global.devBuild, $.useref()))
    .pipe($.if(global.devBuild, $.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(global.paths.build.html))
}