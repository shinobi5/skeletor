const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const ROOT = process.cwd();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(ROOT, '/src'),
    watchContentBase: true,
    hot: true,
    port: 1234
  },
});
