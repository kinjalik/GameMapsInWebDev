const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.styles}/*.{scss,css}`)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
        return {
          'title': 'SCSS Compile Fail',
          'subtitle': 'Check the Console Window',
          'message': err.message,
          "sound": 'Pulse',
          'onLast': true,
        }
      })
    }))
    .pipe($.newer(global.paths.build.styles))
    .pipe($.sass())
    .pipe($.if(global.devBuild, $.postcss(global.postcssProcessorsProd)))
    .pipe(gulp.dest(global.paths.build.styles))
}
