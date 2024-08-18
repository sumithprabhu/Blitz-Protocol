const { ethers } = require('ethers');
const connectDB = require('./config/database');
const indexEventsFromBlock = require('./components/indexEventsFromBlock');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Set up provider
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Listen for new blocks
provider.on('block', async (blockNumber) => {
    console.log(`New block detected: ${blockNumber}`);
    await indexEventsFromBlock(blockNumber, provider);
});
