const { ethers } = require('ethers');
const ContractEvent = require('../models/ContractEvent');

// Function to initialize event storage for a contract
async function initializeEventStorage(contractAddress, contractABI) {
    console.log(`Initializing event storage for contract at address: ${contractAddress}`);

    const events = {};
    const contractInterface = new ethers.utils.Interface(contractABI);

    // Scan the ABI for events and initialize an empty array for each event
    contractInterface.fragments.forEach(fragment => {
        if (fragment.type === 'event') {
            events[fragment.name] = []; // Initialize empty array for each event
        }
    });

    // Create the new contract event storage entity in MongoDB with contractAddress as _id
    const newContractEvent = new ContractEvent({ _id: contractAddress, events });
    await newContractEvent.save();

    console.log(`Event storage initialized for contract: ${contractAddress}`);
}

module.exports = initializeEventStorage;
