const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
	console.log(global.paths.src.base);
	console.log(global.paths.src.styles);
  return gulp.src([
      `${global.paths.src.base}/**/*.*`,
      `!${global.paths.src.styles}/**/*.css`,
      `!${global.paths.src.styles}/**/*.scss`,
      `!${global.paths.src.fonts}/*.*`,
      `!${global.paths.src.html}/**/*.html`,
      `!${global.paths.src.js}/**/*.js`,
      `!${global.paths.src.img}/**/*.*`
    ])
    .pipe(gulp.dest(global.paths.build.base))
}