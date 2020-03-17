const path = require('path');

module.exports = {
  entry: './src/main.js',
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
};