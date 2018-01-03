
// ************************************************************************
// ************************* ERROR HANDLERS *******************************
// ************************************************************************


module.exports = (app) => {

  // *********************************************
  // ***** LOG AND CRASH ON UNHANDLED ERRORS *****
  // *********************************************

  process.on('uncaughtException', (err) => {
    // LOGENTRIES CAN BE SET UP TO CATCH THIS ERROR AND ALERT US VIA SLACK AND EMAIL
    console.error('CRITICAL UNHANDLED ERROR EVENT! LOGGED:');
    console.error(err);
    console.error(err.stack);
    console.error('SHUTTING DOWN GRACEFULLY....');
    process.exit(1);

    // **************************************************************************
    // ************* REDIRECT TO CUSTOM ERROR PAGE IS HANDLED BELOW *************
    // **** THIS HANDLER WILL ONLY FIRE WHEN CRITICAL NON-ROUTE ERRORS OCCUR ****
    // **************************************************************************
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will give stacktrace in web console
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      if (err.status !== 404) {
        console.log(err);
      }

      res.status(err.status || 500)
        .render('misc_views/error_page', { message: err.message, errorType: err.status, error: { err } });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    if (err.status !== 404) {

      // LOGENTRIES CAN BE SET UP TO CATCH THIS ERROR AND ALERT US VIA SLACK AND EMAIL
      console.log('CAUGHT AN API ERROR:');
      console.error(err);
    }

    res.status(err.status || 500)
      .render('misc_views/error_page', { message: err.message, errorType: err.status, error: {} });
  });
};
