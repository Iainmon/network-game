const path = require('path');
require('./dependencies/matter-tools/webgl/index')

module.exports = {
  entry: './client/src/main.ts',
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'build.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    compress: true,
    port: 9000
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};