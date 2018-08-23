const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String
});


// create a model
const User = mongoose.model('user', userSchema);

module.exports = User;