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


app.use(cors({origin:true,credentials: true}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


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

        return res.status(200).json({
            message: 'Protocol registered and event storage initialized successfully.',
            _id: newBlitz._id, // Return the MongoDB document _id
        });
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

app.get('/blitz/:id', async (req, res) => {
    try {
      const blitzId = req.params.id;
  
      // Find the Blitz entry by _id
      const blitzEntry = await Blitz.findById(blitzId);
  
      // If the entry is not found, return a 404 response
      if (!blitzEntry) {
        return res.status(404).json({ message: 'Blitz entry not found' });
      }
  
      // Return the found entry
      return res.status(200).json(blitzEntry);
    } catch (error) {
      console.error('Error fetching Blitz entry:', error);
      return res.status(500).json({ message: 'Internal server error' });
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
