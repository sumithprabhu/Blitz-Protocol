const mongoose = require('mongoose');

// Schema for each event instance
const EventInstanceSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Flexible data storage
        required: true,
    },
});

// Main schema for storing contract events
const ContractEventSchema = new mongoose.Schema({
    contractAddress: {
        type: String,
        required: true,
        unique: true,
    },
    events: {
        type: Map,
        of: [EventInstanceSchema], // Each event is an array of instances
        default: {}, // Initialize as an empty object
    },
});

// Create and export the model
module.exports = mongoose.model('ContractEvent', ContractEventSchema);
