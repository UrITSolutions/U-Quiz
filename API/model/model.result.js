const mongoose = require('mongoose');

module.exports.Result = mongoose.model('result',new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    answers: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}))