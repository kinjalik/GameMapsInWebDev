const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
	console.log(global.paths.src.base);
	console.log(global.paths.src.styles);
  return gulp.src(global.paths.src.assetsFiles)
    .pipe(gulp.dest(global.paths.build.base))
}