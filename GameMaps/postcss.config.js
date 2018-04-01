/* eslint-disable */

const autoprefixer = require('autoprefixer');
const focus = require('postcss-focus');
const discardComments = require('postcss-discard-comments');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

/* eslint-enable */

module.exports = {
  plguins: [
    autoprefixer({
      browsers: ['>0.5%'],
    }),
    focus,
    discardComments,
    mqpacker({
      sort: true,
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
