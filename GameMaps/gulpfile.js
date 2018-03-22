// Confiquration File
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const global = require('./gulp/config.js') ();

let reqTask = function(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return require(path).call(this, options);
  });
}


reqTask('html', './gulp/tasksBuild/html');
reqTask('styles', './gulp/tasksBuild/styles');
reqTask('js', './gulp/tasksBuild/scripts');
reqTask('img', './gulp/tasksBuild/img');
reqTask('fonts', './gulp/tasksBuild/fonts');
reqTask('assets', './gulp/tasksBuild/assets');
reqTask('clean', './gulp/tasksBuild/clean');
if (global.devBuild) {
  gulp.task('build', gulp.series(gulp.parallel('html', 'styles', 'js', 'assets', 'fonts', 'img')));
} else {
  gulp.task('build', gulp.series('clean', gulp.parallel('html', 'js', 'styles', 'assets', 'fonts', 'img')));
}

gulp.task('server', function() {
  browserSync.init({
    server: 'build',
    reloadOnRestart: true,
    notify: true
  });
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
})

gulp.task('watch', function() {
  gulp.watch(`${global.paths.src.html}/**/*.html`, gulp.series('html'));
  gulp.watch(`${global.paths.src.styles}/**/*.{scss,css}`, gulp.series('styles'));
  gulp.watch(`${global.paths.src.fonts}/**/*.*`, gulp.series('fonts'));
  gulp.watch(`${global.paths.src.js}/**/*.js`, gulp.series('js'));
  gulp.watch(`${global.paths.src.img}/**/*.*`, gulp.series('img'));
  gulp.watch([
      `${global.paths.src.base}/**/*.*`,
      `!${global.paths.src.styles}/**/*.{scss,css}`,
      `!${global.paths.src.fonts}/*.*`,
      `!${global.paths.src.html}/**/*.html`,
      `!${global.paths.src.js}/**/*.js`,
      `!${global.paths.src.img}/**/*.*`
    ], gulp.series('assets'));
});

gulp.task('dev', gulp.series('clean', 'build', gulp.parallel('watch', 'server')));
