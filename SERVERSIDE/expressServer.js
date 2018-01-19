
// ************************************************************************
// ********************* INITIAL SETUP / DEPENDENCIES *********************
// ************************************************************************

// UTILITIES THAT NODE REALLY LIKES
require('dotenv').load();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// FORCE APP TO USE SSL IN HEROKU PRODUCTION MODE
const ssl = require('heroku-ssl-redirect');

// INSTANTIATE AN EXPRESS INSTANCE
const app = express();

// LINK THE FAVICON
// NOT TECHNICALLY A NODE DEPENDENCY, BUT IT MAKES HEROKU HAPPY
const favicon = require('serve-favicon');
app.use(favicon(path.join(process.env.PWD, 'CLIENTSIDE/public', 'favicon.ico')));


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ********************** DATABASE CONNECTION *****************************
// ************************************************************************

// CONNECT AND CONFIG MONGODB
require('./models/db');


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ********************* VIEW TEMPLATING ENGINE ***************************
// ************************************************************************

// EJS
app.set('views', path.join(process.env.PWD, 'CLIENTSIDE/views'));
app.set('view engine', 'ejs');
app.set('view cache', false);


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ***************************************************************************
// ************************ EXPRESS MIDDLEWARE *******************************
// ***************************************************************************

// FORCE ALL REQUESTS ACROSS SSL IN HEROKU
// PRODUCTION MODE ONLY BY DEFAULT
// DISABLED WHEN SIMULATING PRODUCTION MODE LOCALLY
// if(process.env.HOST_MODE !== 'localdev') {
//   app.use(ssl());
// }

// PARSING REQUESTS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// PLUGIN FOR LOGGING ALL REQUESTS MADE VIA HTTP
// DEV MODE ONLY
const logger = require('morgan');
app.use(logger('dev'));


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ****************************** AUTH ************************************
// ************************************************************************

// NOTE: THIS HAS TO COME BEFORE ANY
// AUTH-PROTECTED ROUTES ARE INSTANTIATED
const authHandler = require('./auth');
authHandler(app);


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ************************ EXPRESS ROUTING *******************************
// ************************************************************************

// THESE ROUTES ARE OUR KEY API ROUTES
const routes = require('./routes/routes.js');
app.use('/', routes);


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

// ************************************************************************
// ************************* STATIC ASSETS ********************************
// ************************************************************************

// STATIC SERVE THE PUBLIC DIRECTORY AT /public (EG. /images/yourFileName)
app.use('/', express.static(path.join(process.env.PWD, 'CLIENTSIDE/public')));

if (process.env.NODE_ENV === 'production') {
  // PRODUCTION MODE ONLY!
  // SERVE THE STATIC FOLDER WHERE WEBPACK BUILDS PRODUCTION ASSETS
  app.use('/static', express.static(path.join(process.env.PWD, 'CLIENTSIDE/static')));
}


module.exports = app;
