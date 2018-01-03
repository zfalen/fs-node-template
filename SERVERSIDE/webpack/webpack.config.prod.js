const path = require('path');
const webpack = require('webpack');
const WebpackStrip = require('strip-loader');

module.exports = {
  context: path.join(process.env.PWD, 'CLIENTSIDE/JS'),
  entry: {
    login_page: ['./hot_styles/login-page'],
    app: ['babel-polyfill', './components/index'],
  },
  output: {
    path: path.join(process.env.PWD, 'CLIENTSIDE/static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  node: {fs: 'empty'},
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['transform-decorators-legacy', 'transform-object-assign', 'array-includes']
            }
          },
          { loader: WebpackStrip.loader('debug', 'console.log') }
        ],
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
};
