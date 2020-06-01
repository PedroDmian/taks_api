'use struct'

const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let taksSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'El user_id es necesario']
    },
    image: {
        type: String
    },
    name: {
        type: String,
        minLength: 2,
        required: [true, 'El name es necesario'],
    },
    description: {
        type: String
    },
    active: {
        type: Number
    }
});

taksSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' } );

module.exports = mongoose.model('Taks', taksSchema);