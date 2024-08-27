const { ethers } = require('ethers');
const ContractEvent = require('../models/ContractEvent');

const indexEventsFromBlock = async (blockNumber, provider) => {
    console.log(`Fetching block number: ${blockNumber}`);
    const block = await provider.getBlockWithTransactions(blockNumber);

    // Fetch all contracts from the database
    const contracts = await ContractEvent.find({});
    console.log(`Found ${contracts.length} contracts in the database.`);

    // Log all contract addresses
    console.log('Contract addresses:', contracts.map(contract => contract._id));

    // Loop through each contract asynchronously
    for (const contract of contracts) {
        console.log(`\nProcessing contract: ${contract._id}`);

        if (!contract.abi || !Array.isArray(contract.abi)) {
            console.error(`ABI for contract ${contract._id} is invalid or undefined.`);
            continue; // Skip this contract and move to the next one
        }

        const contractInterface = new ethers.utils.Interface(contract.abi);

        // Process each transaction in the block
        for (const tx of block.transactions) {
            console.log(`\nProcessing transaction: ${tx.hash}`);
            console.log(`Transaction to address: ${tx.to}, from address: ${tx.from}`);

            const receipt = await provider.getTransactionReceipt(tx.hash);

            if (receipt && Array.isArray(receipt.logs)) {
                console.log(`Transaction has ${receipt.logs.length} logs.`);

                // Process each log in the transaction receipt
                for (const log of receipt.logs) {
                    console.log(`\nProcessing log: ${log.logIndex}, log address: ${log.address}`);

                    // Check if the log address matches the contract address
                    if (log.address.toLowerCase() === contract._id.toLowerCase()) {
                        console.log(`Log address matches contract address: ${contract._id}`);

                        try {
                            const event = contractInterface.parseLog(log);
                            console.log(`Event detected: ${event.name} with data: ${JSON.stringify(event.args)}`);

                            // Dynamically extract and convert event arguments
                            const eventData = {};
                            event.args.forEach((arg, index) => {
                                const inputName = event.eventFragment.inputs[index].name || `arg${index}`;
                                eventData[inputName] = ethers.BigNumber.isBigNumber(arg) ? arg.toString() : arg;
                            });

                            const eventInstance = {
                                timestamp: new Date(),
                                eventName: event.name,
                                data: eventData,
                            };

                            // Append the event instance to the appropriate event array in the database
                            if (contract.events.has(event.name)) {
                                contract.events.get(event.name).push(eventInstance);
                            } else {
                                contract.events.set(event.name, [eventInstance]);
                            }

                            // Save the updated contract event document back to the database
                            await contract.save();

                            console.log(`Event data saved for contract: ${contract._id}, event: ${event.name}`);
                        } catch (error) {
                            console.error(`Failed to parse log for contract ${contract._id}:`, error);
                        }
                    } else {
                        console.log(`Log address ${log.address} does not match contract address ${contract._id}.`);
                    }
                }
            } else {
                console.error('No logs found or logs is not an array in this transaction receipt:', receipt);
            }
        }
    }
};

module.exports = indexEventsFromBlock;
