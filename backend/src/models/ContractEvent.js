
const mongoose = require('mongoose');

// Schema for each event instance
const EventInstanceSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
});

// Main schema for storing contract events
const ContractEventSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    events: {
        type: Map,
        of: [EventInstanceSchema], // Each event is an array of instances
        default: {}, // Initialize as an empty object
    },
});

// Use the contract address as the _id
module.exports = mongoose.model('ContractEvent', ContractEventSchema);
