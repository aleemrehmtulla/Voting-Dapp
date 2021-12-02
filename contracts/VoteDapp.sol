// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VoteDapp {
    uint256 totalVotes;
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

    function vote(string memory _message) public {

        require(
            lastVotedAt[msg.sender] + 10 seconds < block.timestamp,
            "Wait 10 secondss before voting again!"
        );

  
        lastVotedAt[msg.sender] = block.timestamp;

        totalVotes += 1;
        console.log("%s has voted!", msg.sender);

        votes.push(Vote(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewVote(msg.sender, block.timestamp, _message);
    }

    function getAllVotes() public view returns (Vote[] memory) {
        return votes;
    }

    function getTotalVotes() public view returns (uint256) {
        return totalVotes;
    }
}