const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const $ = require('gulp-load-plugins')();

const sourceDirs = {
  base: 'src',
  html: 'src',
  styles: 'src/scss',
  js: 'src/js',
  fonts: 'src/fonts',
  img: 'src/img',
  assetsFiles: [
    `src/**/*.*`,
    `!src/scss/**/*.{scss,css}`,
    `!src/scss//*.*`,
    `!src/**/*.html`,
    `!src/js/**/*.js`,
    `!src/img/**/*.*`
  ]
}

const buildDirs = {
  base: '../docs',
  html: '../docs',
  styles: '../docs/css',
  js: '../docs/js',
  fonts: '../docs/fonts',
  img: '../docs/img'
}

module.exports = () => {
  return {
    devBuild: process.env.NODE_ENV !== 'production',
    paths: {
      src: sourceDirs,
      build: buildDirs
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
    ],
    babelSettings: {
      presets: ['env']
    },
    errorHandler: {
      'subtitle': 'Check the Console Window',
      "sound": 'Pulse',
      'onLast': true,
    }
  }
}
