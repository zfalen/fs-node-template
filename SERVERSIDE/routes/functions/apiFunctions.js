// ESLINT GLOBALS
/* global WP, wp_pages_data, getPartials */

const mongoose = require('mongoose');
const User = require('../../models/user');

const request = require('axios');
const queryString = require('querystring');


module.exports = function (req, res, next) {


    // *********************
    // *** GET FUNCTIONS ***
    // *********************

    this.getFirstUserFromDB = mongoose.model('User').findOne({});

    this.sendUserDataToClient = mongooseResult => {
      res.json(mongooseResult);
    }

    // **********************
    // *** POST FUNCTIONS ***
    // **********************

    // PULL MAIN DATA FROM THE REQUEST OBJECT
    this.getUserFromDB = mongoose.model('User').findById({_id: req.body._id});

    this.updateOrCreateUser = mongooseResult => {
      const { bgUrl, imgUrl, name, tagline, rank, sharkicorns } = req.body;
      if (mongooseResult) {
        mongooseResult.set({ bgUrl, imgUrl, name, tagline, rank, sharkicorns });
        mongooseResult.save();
        res.sendStatus(200);
      } else {
        const user = new User({ bgUrl, imgUrl, name, tagline, rank, sharkicorns });
        user.save();
        res.sendStatus(200);
      }
    };


    // ***********************
    // *** ERROR FUNCTIONS ***
    // ***********************

    this.apiErrorHandler = err => {
      console.error('PROBLEM WITH MONGO');
      console.error(err);

      res.sendStatus(500);
    }

}
