// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";
import "./TruthOwnable.sol";

contract Facts is TruthOwnable {
  struct Fact{
    uint argumentId;
    string text;
    bool inSupport;
    uint relevanceScore;
    address[] voterAddresses;
    mapping(address => bool) alreadyVoted;
  }

  uint numFacts;

  constructor() {
    numFacts = 0;
  }

  mapping (uint => TruthEarned[]) truthEarnedByArgId;

  // Scopes
  mapping (uint => uint[]) factsByArgId;
  mapping (address => uint[]) factsByDebaterAddress;

  mapping (uint => Fact) facts;
  
  function create(uint argId, string memory text, bool inSupport) public {
    numFacts ++;
    uint factId = 0 + numFacts;
    facts[factId].text = text;
    facts[factId].inSupport = inSupport;
    facts[factId].argumentId = argId;
    factsByArgId[argId].push(factId);
    factsByDebaterAddress[msg.sender].push(factId);
  }

  function forArgument(uint argId) public view returns(uint[] memory) {
    return factsByArgId[argId];
  }

  function truthEarned(uint argId) public view returns(TruthEarned[] memory) {
    return truthEarnedByArgId[argId];
  }

  function isSupporting(uint factId) public view returns(bool) {
    return facts[factId].inSupport;
  }
  
  function argumentIdFor(uint factId) public view returns(uint) {
    return facts[factId].argumentId;
  }

  function mine() public view returns(uint[] memory) {
    return factsByDebaterAddress[msg.sender];
  }

  function getDetails(uint factId) public view returns(string memory, bool, uint) {
    return (facts[factId].text, facts[factId].inSupport, facts[factId].relevanceScore); 
  }

  function alreadyVotedFor(uint factId) public view returns (bool) {
    uint[] memory siblingFacts = factsByArgId[facts[factId].argumentId];
    uint numSiblings = siblingFacts.length;
    bool _alreadyVoted = false;
    for (uint i = 0; i < numSiblings; i++) {
      if (!_alreadyVoted && facts[siblingFacts[i]].alreadyVoted[msg.sender]) {
        _alreadyVoted = true;
      }
    }
    return _alreadyVoted;
  }

  function commitTruthTo(uint factId, address debater) public onlyTruth {
    factsByDebaterAddress[debater].push(factId);
    facts[factId].alreadyVoted[debater] = true;
    facts[factId].voterAddresses.push(debater);
    facts[factId].relevanceScore += 1;
  }

  function score(uint argId) public onlyTruth returns (uint[] memory) {
    uint numArgFacts = factsByArgId[argId].length;
    uint totalScore = 0;
    uint[] memory scores = new uint[](numArgFacts);
    for (uint i = 0; i < numArgFacts; i++) {
      uint factId = factsByArgId[argId][i];
      uint scoreForFact = facts[factId].relevanceScore;
      totalScore += scoreForFact;
      scores[i] = scoreForFact;
    }
    for (uint j = 0; j < numArgFacts; j++) {
      scores[j] = (scores[j] * 100) / totalScore;
      uint factId = factsByArgId[argId][j];
      address[] memory voters = facts[factId].voterAddresses;
      uint numVoters = voters.length;
      for (uint k = 0; k < numVoters; k++) {
        truthEarnedByArgId[argId].push(TruthEarned(voters[k], 100 + scores[j]));
      }
    }
    return scores;
  }
}
