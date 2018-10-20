const mongoose = require('mongoose');

module.exports.User = mongoose.model('user',new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    church: {
        type: Number,
        required: true
    }
}))