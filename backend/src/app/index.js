const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('../config/database');
const initializeEventStorage = require('../components/initializeEventStorage');
const schema = require('../graphql/schema'); // Import the GraphQL schema
const createUser = require('../components/createUser'); // Import the createUser function
const User = require('../models/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB();


// Existing route for registering contracts and creating users
app.post('/register', async (req, res) => {
    const { walletAddress, contractAddress, contractABI } = req.body;

    if (!walletAddress || !contractAddress || !contractABI) {
        return res.status(400).json({ error: 'Wallet address, contract address, and ABI are required.' });
    }

    try {
        // Initialize event storage
        await initializeEventStorage(contractAddress, contractABI);

        // Create a new user and generate an API key
        const apiKey = await createUser(walletAddress, contractAddress);

        return res.status(200).json({ message: 'User and event storage initialized successfully.', apiKey });
    } catch (error) {
        console.error('Error initializing event storage or creating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GraphQL middleware for handling GraphQL queries
app.use('/graphql/:walletAddress', async (req, res, next) => {
    const walletAddress = req.params.walletAddress;
    const apiKey = req.header('x-api-key');
    
    if (!walletAddress || !apiKey) {
        return res.status(403).json({ error: 'Forbidden: Wallet address and API Key are required.' });
    }

    // Find the user by walletAddress (which is the _id in the User model)
    const user = await User.findById(walletAddress);
    if (!user) {
        return res.status(403).json({ error: 'Forbidden: Invalid wallet address.' });
    }

    // Validate the API key
    if (user.apiKey !== apiKey) {
        return res.status(403).json({ error: `Forbidden: Invalid API Key.` });
    }

    req.user = user; // Attach the user object to the request for later use
    next();
}, graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true, // Enable GraphiQL interface
    context: {
        user: req.user // Pass the authenticated user to the GraphQL context
    }
})));


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
