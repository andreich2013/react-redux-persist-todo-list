var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const dev = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};

const prod = {};

module.exports = Object.assign({
  entry: [
    './src/app/index.js',
    './src/assets/styles/index.scss'
  ],
  module: {
    rules: [
      { 
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap!autoprefixer-loader?browsers=last 2 versions!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'}) },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) }
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/assets/images',
        to: __dirname + '/dist/images'
      },
      {
        from: __dirname + '/src/app/index.html',
        to: __dirname + '/dist/index.html'
      },
      {
        from: __dirname + '/src/server.js',
        to: __dirname + '/dist/server.js'
      }
    ])
  ],
  resolve: {
    modules: [__dirname + '/node_modules', __dirname + '/src', __dirname + '/assets'],
  },
  resolveLoader: {
    modules: [__dirname + '/node_modules']
  }
}, prod);
