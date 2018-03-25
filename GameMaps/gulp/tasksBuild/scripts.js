const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.js}/**/*.js`)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
        return {
          'title': 'JS Build Fail',
          'subtitle': 'Check the Console Window',
          'message': err.message,
          "sound": 'Pulse',
          'onLast': true,
        }
      })
    }))
    //.pipe($.newer(global.paths.build.js))
    //.pipe($.if(global.devBuild, $.babel(global.babelSettings)))
    //∂.pipe($.if(global.devBuild, $.uglify()))
    .pipe(gulp.dest(global.paths.build.js))
}