const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const global = require('../config') ();

module.exports = () => {
  return del(global.paths.build.base, {force:true});
}
