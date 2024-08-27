const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('../config/database');
const initializeEventStorage = require('../components/initializeEventStorage');
const schema = require('../graphql/schema'); // Import the GraphQL schema
const createUser = require('../components/createUser'); // Import the createUser function
const Blitz = require('../models/blitz'); // Import the Blitz model
const User = require('../models/user');
const cors = require('cors');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://blitz-protocol.vercel.app"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.use(express.json());

connectDB();

// Route for registering contracts and protocols
app.post('/register', async (req, res) => {
    const { contractAddress, contractABI, protocolName, imageUrl } = req.body;

    if (!contractAddress || !contractABI || !protocolName) {
        return res.status(400).json({ error: 'Contract address, protocol name, and ABI are required.' });
    }

    try {
        // Initialize event storage
        await initializeEventStorage(contractAddress, contractABI);

        // Create a new Blitz entry
        const newBlitz = new Blitz({
            protocolName,
            contractAddress,
            imageUrl,
        });
        await newBlitz.save();

        return res.status(200).json({ message: 'Protocol registered and event storage initialized successfully.' });
    } catch (error) {
        console.error('Error registering protocol or initializing event storage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Separate route for creating users
app.post('/createUser', async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).json({ error: 'Wallet address is required.' });
    }

    try {
        // Create a new user or return existing API key
        const { apiKey, message } = await createUser(walletAddress);

        return res.status(200).json({ message, apiKey });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to return all Blitz records
app.get('/blitz', async (req, res) => {
    try {
        const blitzRecords = await Blitz.find({});
        return res.status(200).json(blitzRecords);
    } catch (error) {
        console.error('Error fetching Blitz records:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GraphQL middleware for handling GraphQL queries
app.use('/api/:apikey/:contractAddress', async (req, res, next) => {
    const { apikey, contractAddress } = req.params;

    if (!apikey || !contractAddress) {
        return res.status(403).json({ error: 'Forbidden: API key and Contract Address are required.' });
    }

    // Verify if the API key exists (for appearance only)
    const user = await User.findOne({ apiKey: apikey });
    if (!user) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key.' });
    }

    // Attach the contract address to the request object for GraphQL usage
    req.contractAddress = contractAddress;
    next();
}, graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true, // Enable GraphiQL interface
    context: {
        contractAddress: req.contractAddress // Pass the contract address to the GraphQL context
    }
})));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
