const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./client/index.js"],
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },

  mode: process.env.NODE_ENV,
  devServer: {
    hot: true,
    historyApiFallback: true,
    publicPath: "/build",
    proxy: {
      '/location': {
        // publicPath : '/build',
        target: "http://localhost:8008",
        secure: false,
      },
      '/signup': {
        // publicPath : '/build',
        target: "http://localhost:8008",
        secure: false,
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};