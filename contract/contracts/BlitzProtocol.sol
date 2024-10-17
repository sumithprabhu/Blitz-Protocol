// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract BlitzProtocol {
    // Struct to hold Blitz details
    struct Blitz {
        string protocolName;               // Name of the protocol associated with the Blitz
        uint256 timestamp;
        bool isActive;
        address protocolContractAddress;   // Contract address of the protocol
        string _id;
    }

    // State variables
    mapping(address => Blitz) public blitzes; // Mapping to store Blitzes by creator address
    uint256 public totalBlitzCount; // Total number of Blitzes created
    address payable public owner; // Contract owner (payable to receive ETH)
    uint256 public blitzCreationFee = 0.01 ether; // Fee to create a Blitz (0.01 ETH)

    // Events
    event BlitzCreated(address indexed creator, string protocolName, uint256 timestamp, address protocolContractAddress, string _id);
    event BlitzDeactivated(address indexed creator, string protocolName);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    constructor() {
        owner = payable(msg.sender); // Set owner as a payable address
        totalBlitzCount = 0;
    }

    function createBlitz(string memory protocolName, address protocolContractAddress, string memory _id) public payable {
        require(msg.value == blitzCreationFee, "Incorrect fee sent");
        require(blitzes[msg.sender].timestamp == 0, "Each address can create only one Blitz");

        Blitz memory newBlitz = Blitz({
            protocolName: protocolName,
            timestamp: block.timestamp,
            isActive: true,
            protocolContractAddress: protocolContractAddress,
            _id: _id
        });

        blitzes[msg.sender] = newBlitz; // Store the new Blitz under creator's address
        totalBlitzCount += 1; // Increment total count of Blitzes
        owner.transfer(msg.value); // Transfer the received ETH to the owner

        emit BlitzCreated(msg.sender, protocolName, block.timestamp, protocolContractAddress, _id); // Emit event
    }

    function deactivateBlitz() public {
        require(blitzes[msg.sender].isActive, "Blitz not active or non-existent");
        blitzes[msg.sender].isActive = false;
        emit BlitzDeactivated(msg.sender, blitzes[msg.sender].protocolName);
    }

    function getBlitz(address userAddress) public view returns (string memory _id) {
        return blitzes[userAddress]._id;
    }

    function getTotalBlitzCount() public view returns (uint256) {
        return totalBlitzCount;
    }

    function getBlitzCreationFee() public view returns (uint256) {
        return blitzCreationFee;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setBlitzCreationFee(uint256 newFee) public onlyOwner {
        blitzCreationFee = newFee;
    }

    function hasBlitz(address user) public view returns (bool) {
    return blitzes[user].timestamp != 0;
}
}
