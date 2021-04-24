const path = require('path');

module.exports = {

    entry: './client/index.js',
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js',
    },

    mode: process.env.NODE_ENV,
    devServer: {
        proxy: {
            publicPath : '/build',
            port: 8080,
        },
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use : {
              loader : 'babel-loader',
              options : {
                presets : ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader"
            ],
          },
        ]
      },
}




