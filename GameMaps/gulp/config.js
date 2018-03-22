const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const $ = require('gulp-load-plugins')();

module.exports = () => {
  return {
    devBuild: process.env.NODE_ENV !== 'production',
    paths: {
      src: {
        base: 'src',
        html: 'src',
        styles: 'src/scss',
        js: 'src/js',
        fonts: 'src/fonts',
        img: 'src/img'
      },
      build: {
        base: '../docs',
        html: '../docs',
        styles: '../docs/css',
        js: '../docs/js',
        fonts: '../docs/fonts',
        img: '../docs/img'
      }
    },
    postcssProcessorsProd: [
      autoprefixer(),
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      })
    ]
  }
}
