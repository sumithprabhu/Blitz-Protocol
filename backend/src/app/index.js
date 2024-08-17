const analyzeContractEvents = require('../components/eventAnalyzer');
const initializeEventStorage = require('../components/initializeEventStorage');

// Example contract address and ABI (replace with real values when testing)
const contractAddress = '0xB4fd61544493a27a4793F161d6BE153d1A0f6092'; // Replace with your actual contract address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "resetNumber",
				"type": "uint256"
			}
		],
		"name": "NumberReset",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newNumber",
				"type": "uint256"
			}
		],
		"name": "NumberUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newNumber",
				"type": "uint256"
			}
		],
		"name": "updateNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const connectDB = require('../config/database');

connectDB().then(async () => {
    await initializeEventStorage(contractAddress, contractABI);
    console.log('Event storage initialization complete');
    process.exit();
});



// // Connect to the database
// connectDB().then(() => {
//     console.log('Connection to MongoDB is successful.');
//     process.exit();
// }).catch(err => {
//     console.error('Failed to connect to MongoDB:', err);
//     process.exit(1);
// });
