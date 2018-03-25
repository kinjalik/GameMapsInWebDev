const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.img}/**/*.*`, { since: gulp.lastRun('img') })
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
		return Object.assign(global.errorHandler, { 'message': err.message }, { 'title': 'IMG Build Fail' })
      })
    }))
    .pipe($.if(!global.devBuild, $.imagemin(global.imageminSettings)))
    .pipe(gulp.dest(global.paths.build.img))
}
