const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required:true
    } 

})

module.exports = Profile = mongoose.model('profile', ProfileSchema );