const path = require('path');

module.exports = {

    entry: ['babel-polyfill', './client/index.js'],
    output: {
      path: path.join(__dirname, '/build'),
      filename: 'bundle.js',
    },

    mode: process.env.NODE_ENV,
    devServer: {
      publicPath : '/build',
      port : 8080,
      proxy: {
          '/': 'http://localhost:3000'
        }
      
      //{
        
      //   // publicPath : '/build',
      //    '/location/': 'http://localhost:3000',
      //    '/signup/' : 'http://localhost:3000'
      // },
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




