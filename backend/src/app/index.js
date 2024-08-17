const express = require('express');
const connectDB = require('../config/database');
const initializeEventStorage = require('../components/initializeEventStorage');

// Load environment variables
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define the /register route
app.post('/register', async (req, res) => {
    const { contractAddress, contractABI } = req.body;

    // Validate input
    if (!contractAddress || !contractABI) {
        return res.status(400).json({ error: 'Contract address and ABI are required.' });
    }

    try {
        // Initialize event storage for the provided contract address and ABI
        await initializeEventStorage(contractAddress, contractABI);
        return res.status(200).json({ message: 'Event storage initialized successfully.' });
    } catch (error) {
        console.error('Error initializing event storage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



// const analyzeContractEvents = require('../components/eventAnalyzer');
// const initializeEventStorage = require('../components/initializeEventStorage');

// // Example contract address and ABI (replace with real values when testing)
// const contractAddress = '0xB4fd61544493a27a4793F161d6BE153d1A0f6092'; // Replace with your actual contract address
// const contractABI = [
// 	{
// 		"inputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "resetNumber",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "NumberReset",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "oldNumber",
// 				"type": "uint256"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "newNumber",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "NumberUpdated",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "oldOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnerChanged",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "changeOwner",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "resetNumber",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "retrieveNumber",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "retrieveOwner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "newNumber",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "updateNumber",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]

// const connectDB = require('../config/database');

// connectDB().then(async () => {
//     await initializeEventStorage(contractAddress, contractABI);
//     console.log('Event storage initialization complete');
//     process.exit();
// });



// // Connect to the database
// connectDB().then(() => {
//     console.log('Connection to MongoDB is successful.');
//     process.exit();
// }).catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
//     process.exit(1);
// });



