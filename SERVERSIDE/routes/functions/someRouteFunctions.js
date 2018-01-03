// ESLINT GLOBALS
/* global WP, wp_pages_data, getPartials */

const mongoose = require('mongoose');
const SomeModel = require('../../models/someModel');

const request = require('axios');
const queryString = require('querystring');


module.exports = function (req, res, next) {

    // PULL MAIN DATA FROM THE REQUEST OBJECT
    this.initialData = req.body;

    this.someMethod = () => {
      // SOME METHOD GOES HERE
    }

}
