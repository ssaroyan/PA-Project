//require('./config/config');

//const mongoose = require('./db/mongoose');

process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');

console.log(`*** ${String(config.get('LEVEL')).toUpperCase()} ***`);
console.log(config.get('MONGOURI'));
console.log(config.get('PORT'));