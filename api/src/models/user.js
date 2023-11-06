const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    nationality: String,
    academicInfo: Object
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
