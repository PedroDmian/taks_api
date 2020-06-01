'use struct'

const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'El username es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    image: {
        type: String
    },
    active: {
        type: Number
    }
});

userSchema.methods.toJSON = function() {
    let user       = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' } );

module.exports = mongoose.model('User', userSchema);