process.env.NODE_CONFIG_DIR = __dirname + '/config';

const config = require('config');
const express = require('express');
const _ = require('lodash');

const {User} = require('./model/user');

console.log(`*** ${String(config.get('LEVEL')).toUpperCase()} ***`);
console.log(config.get('MONGOURI'));
console.log(config.get('PORT'));


const app = express();
app.use(express.json());

app.post('/api/users', (req, res) => {
    const body = _.pick(req.body, ['fullname', 'email', 'password']);
 
    console.log(body);

    let userData = new User(body); //Jayi ke Ma Datayi ro ke Az Biroon Daryaft mikonim ro mibinim ke be model e ma mikhore ya na ...


    userData.save().then((user) => {
       res.status(200).send(user); 
    }, (err) => {
        res.status(400).json({
            Error : `Something went wrong. ${err}`
        });
    });

});

app.post('/api/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).status(200).send(token);
        }, (err) => {
            res.status(400).json({
                Error: `Somthing went wrong. ${err}`
            });
        });
    }) //jahate dastresi be metod haye dakhele USER ke dar file user.js gharar darand ingoone ast.
});



app.listen(config.get('PORT'), () => {
    console.log(`Server is running on port ${config.get('PORT')}`)
});
