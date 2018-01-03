
// MODULE DEPENDENCIES
const http = require('http');

const compiler = require('./webpack/compiler');
const errorHandlers = require('./errorHandlers');

// NORMALIZE PORT TO NUM, STR, BOOL
const normalizePort = (val) => {
  if (isNaN(parseInt(val, 10))) {
    // named pipe
    return val;
  }

  if (parseInt(val, 10) >= 0) {
    // port number
    return parseInt(val, 10);
  }

  return false;
};


if (process.env.NODE_ENV === 'production') {
  console.log('  💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎💎');
  console.log('  💎 💎 💎 💎  RUNNING IN PRODUCTION MODE  💎 💎 💎 💎');
  console.log('  💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎 💎💎 \n');
} else {
  console.log('  🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧');
  console.log('  🔧 🔧 🔧 🔧  RUNNING IN DEV MODE  🔧 🔧 🔧 🔧');
  console.log('  🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 🔧 \n');
}


// GET PORT FROM ENV AND STORE IT, USED BY WEBPACK LATER
const port = normalizePort(process.env.PORT || '3333');

// SPIN UP THE APP AND ASSIGN THE PORT
const app = require('./expressServer');
app.set('port', port);

// CREATE HTTP SERVER & PASS IT OUR EXPRESS INSTANCE
const server = http.createServer(app);

// COMPILE DEV ASSETS VIA WEBPACK
// OR STATIC SERVE IN PRODUCTION MODE
compiler(app);

// MOUNT ERROR HANDLERS LAST!
errorHandlers(app);

// LISTEN ON DECLARED PORT
server.listen(port);
