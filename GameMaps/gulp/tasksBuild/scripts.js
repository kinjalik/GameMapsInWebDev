const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.js}/**/*.js`)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
        return Object.assign(global.errorHandler, { 'message': err.message }, { 'title': 'JS Build Fail' })
      })
    }))
    .pipe($.newer(global.paths.build.js))
    .pipe($.if(!global.devBuild, $.babel({
      presets: ['env']
    })))
    .pipe($.if(!global.devBuild, $.uglify()))
    .pipe(gulp.dest(global.paths.build.js))
}