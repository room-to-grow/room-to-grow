/* eslint-disable linebreak-style */
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },

  mode: process.env.NODE_ENV,
  devServer: {
    hot: true,
    historyApiFallback: true,
    publicPath: '/build',
    proxy: {
      '/': {
        // publicPath : '/build',
        target: 'http://localhost:7070',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
            loader: 'file-loader',
            }
      }
    ],
  },
};
