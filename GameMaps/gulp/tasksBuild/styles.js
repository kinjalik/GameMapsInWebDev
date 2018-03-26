const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return gulp.src(`${global.paths.src.styles}/*.{scss,css}`)
    .pipe($.plumber({
      errorHandler: $.notify.onError(function(err) {
		return Object.assign(global.errorHandler, { 'message': err.message }, { 'title': 'SCSS Build Fail' })
      })
    }))
    .pipe($.newer(global.paths.build.styles))
    .pipe($.postcss(global.postcssProcessors.preStage))
    .pipe($.sass())
    .pipe($.if(global.devBuild, $.postcss(global.postcssProcessors.postStage)))
    .pipe(gulp.dest(global.paths.build.styles))
}
