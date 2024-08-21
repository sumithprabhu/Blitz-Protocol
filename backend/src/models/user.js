const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    apiKey: {
        type: String,
        required: true,
        unique: true
    },
    contractAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
