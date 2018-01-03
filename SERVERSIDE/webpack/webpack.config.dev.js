const path = require('path');
const webpack = require('webpack');

const WebpackOnBuildPlugin = require('on-build-webpack');

let alreadyCompiled = false;

module.exports = (completeMessage) => {
  return {
    devtool: 'cheap-module-source-map',
    context: path.join(process.env.PWD, 'CLIENTSIDE/JS'),
    entry: {
      login_page: ['webpack-hot-middleware/client', './hot_styles/login-page'],
      app: ['babel-polyfill', 'webpack-hot-middleware/client', './components/index'],
    },
    output: {
      path: path.join(process.env.PWD, 'CLIENTSIDE/static'),
      filename: '[name].js',
      publicPath: '/static/'
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new WebpackOnBuildPlugin( stats => {
        if (!alreadyCompiled){
          alreadyCompiled = true;

          completeMessage();
        }
      })
    ],
    node: {fs: 'empty'},
    module: {
      loaders: [
          {
              test: /\.(js|jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loaders: ['react-hot-loader', { loader: 'babel-loader', options: {
                cacheDirectory: true,
                passPerPreset: true,
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['transform-decorators-legacy', 'transform-object-assign', 'array-includes']
              }}
            ]
          },
          {
              test: /\.scss$/,
              loaders: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }
};
