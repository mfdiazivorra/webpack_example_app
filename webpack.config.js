const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {

  entry: './src/main.js',

  output: {

      path: path.resolve(__dirname, './dist'),

      filename: 'bundle.js'

  },
  module:{

    rules:[
      // {//loading all of the sass into the dom as css
      //   test: /\.s[ac]ss$/,
      //   use: ['style-loader','css-loader','sass-loader']
      // },

      {//this way it extracts the css into a file
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader','sass-loader'],
          fallback: 'style-loader'
        })
      },

      {

        test:/\.css$/,

        use: ['style-loader', 'css-loader']

      },

      {

        test: /\.js$/,

        exclude: /node_modules/,

        loader: "babel-loader"

      }

    ]

  },

  plugins: [

    new ExtractTextPlugin("[name].css"),

    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })

  ]

};


if (inProduction) {

  module.exports.plugins.push(

    new webpack.optimize.UglifyJsPlugin()

  );

}
