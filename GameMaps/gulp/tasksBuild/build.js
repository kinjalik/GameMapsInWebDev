const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = function() {
  gulp.parallel('html', 'styles', 'assets', 'fonts', 'img');
  return gulp.src('package.json')
    .pipe($.if(global.devBuild, $.notify(function(err) {
      return {
        'title': 'Build Complete',
        'subtitle': 'Production Build Ready',
        'message': ' ',
        "sound": 'Pulse',
        'onLast': true,
      }
    })));
}
