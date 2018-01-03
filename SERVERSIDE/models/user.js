const mongoose = require('mongoose');

// define the schema for our user model
const userSchema = mongoose.Schema({
  bgUrl: String,
  imgUrl: String,
  name: String,
  tagline: String,
  rank: String,
  sharkicorns: Array,
  date: { type: Date, default: Date.now }
});


// create the model and expose it to our app
module.exports = mongoose.model('User', userSchema);
