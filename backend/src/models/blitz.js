const mongoose = require('mongoose');

const BlitzSchema = new mongoose.Schema({
    protocolName: {
        type: String,
        required: true,
    },
    contractAddress: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String, // Assuming the image URL is stored as a string
    },
});

module.exports = mongoose.model('Blitz', BlitzSchema);
