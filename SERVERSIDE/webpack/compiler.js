
const webpack = require('webpack');

// *************************************************************************
// ******************** DEV MODE WEBPACK COMPILER **************************
// *************************************************************************

module.exports = (app) => {

  const completeMessage = () => {
    console.log('\n');
    console.log('  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀');
    console.log(`  🚀  🚀  🚀  LIFTOFF ON PORT: ${app.get('port')} 🚀  🚀 🚀`);
    console.log('  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀');
  };

  if (process.env.NODE_ENV !== 'production') {
    // DEVELOPMENT MODE:
    // ASSETS ARE PACKAGED HERE AND HOT RELOADED ON CHANGES

    console.log('\n');
    console.log('  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑');
    console.log('  🦑  🦑  🦑   WEBPACK BUILDING... 🦑  🦑  🦑');
    console.log('  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑  🦑');

    // LOAD OUR WEBPACK DEV CONFIG
    const webpackConfig = require('./webpack.config.dev')(completeMessage);
    const compiler = webpack(webpackConfig);

    // ENABLE HOT RELOADING IN DEV MODE
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));

  } else {
    // PRODUCTION MODE:
    // ASSETS ARE PRE-BUILT AND SERVED VIA EXPRESS STATIC
    // SEE BUILD SCRIPT IN package.json AND STATIC ROUTES IN expressServer.js
    completeMessage();
  }
};
