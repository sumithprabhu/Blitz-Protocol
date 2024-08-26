// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BlitzProtocol {
    // Struct to hold Blitz details
    struct Blitz {
        string name;
        address creator;
        uint256 timestamp;
        uint256 id;
        bool isActive;
    }

    // State variables
    mapping(uint256 => Blitz) private blitzes; // Mapping to store all Blitzes
    uint256 private blitzCounter; // Counter to generate unique Blitz IDs
    address public owner; // Contract owner

    // Events
    event BlitzCreated(uint256 id, string name, address indexed creator, uint256 timestamp);
    event BlitzDeactivated(uint256 id, string name, address indexed deactivator);

    // Modifier to restrict access to owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    // Modifier to check if a Blitz is active
    modifier onlyActive(uint256 id) {
        require(blitzes[id].isActive, "This Blitz is not active");
        _;
    }

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
        blitzCounter = 0;
    }

    // Function to create a new Blitz
    function createBlitz(string memory name) public returns (uint256) {
        blitzCounter += 1; // Increment the counter for a unique ID
        Blitz memory newBlitz = Blitz({
            name: name,
            creator: msg.sender,
            timestamp: block.timestamp,
            id: blitzCounter,
            isActive: true
        });

        blitzes[blitzCounter] = newBlitz; // Store the new Blitz

        emit BlitzCreated(blitzCounter, name, msg.sender, block.timestamp); // Emit event

        return blitzCounter; // Return the new Blitz ID
    }

    // Function to deactivate a Blitz
    function deactivateBlitz(uint256 id) public onlyOwner onlyActive(id) {
        blitzes[id].isActive = false;
        emit BlitzDeactivated(id, blitzes[id].name, msg.sender);
    }

    // Function to retrieve Blitz details
    function getBlitz(uint256 id) public view returns (string memory name, address creator, uint256 timestamp, bool isActive) {
        Blitz memory blitz = blitzes[id];
        return (blitz.name, blitz.creator, blitz.timestamp, blitz.isActive);
    }

    // Function to get the total number of Blitzes created
    function getBlitzCount() public view returns (uint256) {
        return blitzCounter;
    }

    // Function to transfer contract ownership
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
