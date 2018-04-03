const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

console.log('Webpack Started');
module.exports = {
  devServer: {
    stats: 'errors-only',

  },
  mode: 'production',
  entry: {
    vendor: './src/js/vendor.js',
    sa: ['./src/js/sa.js', './src/scss/sa.scss'],
    five: ['./src/js/five.js', './src/scss/five.scss'],
    styles: [
      './src/js/fa.js',
      './src/scss/vendor.scss',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../docs/GameMaps'),
    filename: 'js/[name].js',
    sourceMapFilename: '[file].map',
    library: 'bundle_[name]',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
            publicPath: '../',
          },
        }],
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
              url: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true },
        }],
      },
    ],
  },
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'tools',
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /\.js$/,
          chunks: 'all',
          minChunks: 2,
          name: 'tools',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['../docs/GameMaps/'], {
      allowExternal: true,
    }),
    new ExtractTextPlugin({
      filename: './css/[name].css',
      allChunks: true,
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: false,
    }),
    new HtmlWebPackPlugin({
      template: './src/sa.html',
      filename: './sa.html',
      chunks: ['tools','vendor', 'styles', 'sa'],
    }),
    new HtmlWebPackPlugin({
      template: './src/five.html',
      filename: './five.html',
      chunks: ['tools','vendor', 'styles', 'five'],
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/img/'),
      to: path.resolve(__dirname, '../docs/GameMaps/img/'),
      toType: 'dir'
    }]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 9,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: './src/maps/',
        to: './maps/',
        force: true,
      },
      {
        from: './src/json/',
        to: './json/',
        force: true,
      },
    ]),
  ],
};
