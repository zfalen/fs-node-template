const mongoose = require('mongoose');

// define the schema for our user model
const someModelSchema = mongoose.Schema({
  someString: String,
  someArray: Array,
  someObject: Object,
  date: { type: Date, default: Date.now }
});


// create the model and expose it to our app
module.exports = mongoose.model('SomeModel', someModelSchema);
