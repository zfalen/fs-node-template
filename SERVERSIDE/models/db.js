const mongoose = require('mongoose');

// REPLACE mpromise WITH ES6 / NODE PROMISES
// mpromise WAS DEPRECATED
mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  keepAlive: true,
  connectTimeoutMS: 30000
};

const mongodbUri = process.env.MONGODB_URI || `mongodb://localhost/${process.env.LOCAL_DB_NAME}`;

mongoose.connect(mongooseUri, options);
