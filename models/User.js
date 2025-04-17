const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const  Schema  = mongoose.Schema;

const UserSchema = new Schema({
    phoneNumber: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        trim: true,
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);