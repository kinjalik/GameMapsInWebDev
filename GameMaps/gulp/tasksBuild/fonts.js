const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  gulp.src(`${global.paths.src.fonts}/*.{ttf,otf}`, { since: gulp.lastRun('fonts') })
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
        return Object.assign(global.errorHandler, { 'message': err.message }, { 'title': 'Font Build Fail' })
      })
    }))
    .pipe($.fontgen({
      dest: global.paths.build.fonts
    }))
    .pipe(gulp.dest(global.paths.build.fonts));
  return gulp.src(`${global.paths.build.fonts}/*.css`)
    .pipe($.rename(function(file) {
      file.extname = '.scss'
    }))
    .pipe(gulp.dest(global.paths.src.styles))
}