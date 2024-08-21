const mongoose = require('mongoose');
const User = require('../models/user');
const generateApiKey = require('../utils/generateAPIKeys');
require('dotenv').config();

const createUser = async (walletAddress, contractAddress) => {
    const apiKey = generateApiKey();

    const newUser = new User({
        _id: walletAddress,  // Using wallet address as _id
        apiKey,
        contractAddress
    });

    await newUser.save();
    console.log(`User with wallet address ${walletAddress} created with API key: ${apiKey}`);
    return apiKey;
};

module.exports = createUser;
