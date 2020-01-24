const validartor = require('validator');

const {mongoose} = require('./../db/mongoose');

let UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        trim: true,
        validate: {
            validator: validartor.isEmail,
            message: '{Value} is not valid email' 
        }
    },
    password: {
        type: String,
        required: true,
        minlength: true
    }
});

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};