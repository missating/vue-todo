const dotEnv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// instantiating webpack dependencies
const cleanWebpack = new cleanWebpackPlugin(['dist']);
const htmlWebpack = new htmlWebpackPlugin({
  template: 'client/src/index.html'
});
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const miniCssExtract = new miniCssExtractPlugin();
const vueLoaderPlugin = new VueLoaderPlugin();

// stringify env variables
const envs = dotEnv.config().parsed;
const stringifiedEnvs = {};
Object.keys(envs).forEach((envKey) => {
  stringifiedEnvs[envKey] = JSON.stringify(envs[envKey]);
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': stringifiedEnvs
});

module.exports = {
  cleanWebpack,
  htmlWebpack,
  hotModuleReplacementPlugin,
  miniCssExtract,
  definePlugin,
  vueLoaderPlugin
};
