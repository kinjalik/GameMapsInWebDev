const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel'); 
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

module.exports = () => {
  return gulp.src(`${global.paths.src.js}/**/*.js`)

    .pipe(rollup({plugins: [resolve(),
    commonjs()]}, 'umd'))
    .pipe(gulp.dest(global.paths.build.js))
}