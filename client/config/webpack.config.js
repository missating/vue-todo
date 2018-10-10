const path = require('path');
const {
  cleanWebpack,
  htmlWebpack,
  miniCssExtract,
  definePlugin,
  vueLoaderPlugin
} = require('./webpack.plugins');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'index.js'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          isDevMode ? 'vue-style-loader' : miniCssExtract.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        }
      }
    ]
  },
  plugins: [htmlWebpack, cleanWebpack, definePlugin, miniCssExtract, vueLoaderPlugin]
};
