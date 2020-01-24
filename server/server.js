//require('./config/config');

//const mongoose = require('./db/mongoose');

process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');

 const {User} = require('./model/user');

console.log(`*** ${String(config.get('LEVEL')).toUpperCase()} ***`);
console.log(config.get('MONGOURI'));
console.log(config.get('PORT'));


let newUser = new User({
    fullname: 'Sarmen Saroyan',
    email: 'novin@gmail.com',
    password: '123321'
});

newUser.save().then((user) => {
    console.log('User has been saved to the database', user);
});

