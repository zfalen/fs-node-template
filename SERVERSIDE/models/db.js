const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

// REPLACE mpromise WITH ES6 / NODE PROMISES
// mpromise WAS DEPRECATED
mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  keepAlive: true,
  connectTimeoutMS: 30000
};

const mongodbUri = process.env.MONGODB_URI || `mongodb://localhost/${process.env.LOCAL_DB_NAME}`;
const mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);
