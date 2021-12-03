// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VoteDapp {
    uint256 totalVotes;
    uint256 totalTrump;
    uint256 totalBiden;
    uint256 private seed;

    event NewVote(address indexed from, uint256 timestamp, string message);

    struct Vote {
        address voter;
        string message;
        uint256 timestamp;
    }

    Vote[] votes;

    mapping(address => uint256) public lastVotedAt;

    constructor() payable {
        console.log("We have been constructed!");
        seed = (block.timestamp + block.difficulty) % 100;
    }


    // Vote for trump function
    function votetrump(string memory _message) public {
        // Prevent voting multiple times
        require(
            lastVotedAt[msg.sender] + 10 seconds < block.timestamp,
            "Wait 10 secondss before voting again!"
        );
        lastVotedAt[msg.sender] = block.timestamp;

        // Make the new vote
        totalVotes += 1;
        totalTrump += 1;
        console.log(msg.sender, "has voted for trump!");
        votes.push(Vote(msg.sender, _message, block.timestamp));
        emit NewVote(msg.sender, block.timestamp, _message);
    }


    // Vote for biden function
    function votebiden(string memory _message) public {
        // Prevent voting multiple times
        require(
            lastVotedAt[msg.sender] + 0 seconds < block.timestamp,
            "Wait 10 secondss before voting again!"
        );
        lastVotedAt[msg.sender] = block.timestamp;

        // Make the new vote
        totalVotes += 1;
        totalBiden += 1;
        console.log(msg.sender, "has voted for biden!");
        votes.push(Vote(msg.sender, _message, block.timestamp));
        emit NewVote(msg.sender, block.timestamp, _message);
    }

    // Total each candidate's vote count
    function getTotalTrump() public view returns (uint256) {
        return totalTrump;
    }
    function getTotalBiden() public view returns (uint256) {
        return totalBiden;
    }

    // Function to get all the votes (might remove this)
    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }

    // Function to get the total votes
    function getTotalVotes() public view returns (uint256) {
        return totalVotes;
    }
}