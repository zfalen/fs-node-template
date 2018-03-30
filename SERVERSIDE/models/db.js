const mongoose = require('mongoose');

// REPLACE mpromise WITH ES6 / NODE PROMISES
// mpromise WAS DEPRECATED
mongoose.Promise = global.Promise;

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000
};

const mongodbUri = process.env.MONGODB_URI || `mongodb://localhost/${process.env.LOCAL_DB_NAME}`;

mongoose.connect(mongodbUri, options);
