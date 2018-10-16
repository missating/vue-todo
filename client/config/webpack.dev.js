const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const path = require('path');
const {
  hotModuleReplacementPlugin
} = require('./webpack.plugins');

module.exports = merge(config, {
  output: {
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src/assets/images'),
    publicPath: 'http://localhost:8000/',
    hot: true,
    overlay: true,
    port: 8000,
    host: 'localhost',
    open: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  },
  plugins: [hotModuleReplacementPlugin]
});
