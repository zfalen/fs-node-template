
// ESLINT GLOBALS
/* global redundancyCheck, getLocationInfo, resetRedundantID, constructSurveyResult, storeResultInDB, redirectToUniqueURL, getResultFromDB, getPageData, renderPage, getErrorHandler, getResultFromDB, sendRatingToAnalytics, putErrorHandler */

const express = require('express');
const router = express.Router();


// REQUIRE LOGINS FOR STAGING
const checkAuthentication = (req, res, next) => {
  if( process.env.HOST_MODE === 'staging' && !req.isAuthenticated() ) {
    res.redirect('/login');
  } else {
    return next();
  };
}

// *****************************
// ********* ROUTES ************
// *****************************

 // INDEX ROUTE - APP SERVES HERE
 router.route('/')
      .all(checkAuthentication)
      .get( (req, res) => {
          res.render('production_views/index');
      })

 router.route('/api')
      .all( (req, res, next) => {
        // SEE THIS FILE FOR ALL FUNCTIONS
        require('./functions/apiFunctions')(req, res);
        next();
      })
      .get( (req, res) => {
        getFirstUserFromDB
          .then(sendUserDataToClient)
          .catch(apiErrorHandler)
      })

      .post( (req, res) => {
        getUserFromDB
          .then(updateOrCreateUser)
          .catch(apiErrorHandler)
      })


// ----------------------------------------------------------------------------------------------------------------------------------------

 // MANUALLY RENDER AN ERROR PAGE IF NECESSARY
 router.route('/oops')
       .get((req, res) => {
          res.render('misc_views/error_page', {message: "A critical error occurred.", errorType: 500 });
        })

// ----------------------------------------------------------------------------------------------------------------------------------------


// ******************************
// *** ROUTES FOR DEV ONLY ******
// ******************************
if ( process.env.NODE_ENV !== 'production') {

  // DEV ROUTES GO HERE

}



module.exports = router;
