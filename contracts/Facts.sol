// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";
import "./TruthOwnable.sol";

contract Facts is TruthOwnable {
  uint numFacts;

  constructor() {
    numFacts = 0;
  }

  mapping (uint => TruthEarned[]) truthEarnedByArgId;

  // Scopes
  mapping (uint => uint[]) factsByArgId;
  mapping (address => uint[]) factsByDebaterAddress;

  // Attributes
  mapping (uint => uint) argumentId;
  mapping (uint => string) text;
  mapping (uint => bool) inSupport;
  mapping (uint => uint) relevanceScore;
  mapping (uint => address[]) voterAddresses;
  mapping (uint => mapping(address => bool)) alreadyVoted;
  
  function create(uint _argId, string memory _text, bool _inSupport) public {
    numFacts ++;
    uint factId = 0 + numFacts;
    text[factId] = _text;
    inSupport[factId] = _inSupport;
    argumentId[factId] = _argId;
    factsByArgId[_argId].push(factId);
    factsByDebaterAddress[msg.sender].push(factId);
  }

  function forArgument(uint argId) public view returns(uint[] memory) {
    return factsByArgId[argId];
  }

  function truthEarned(uint argId) public view returns(TruthEarned[] memory) {
    return truthEarnedByArgId[argId];
  }

  function isSupporting(uint factId) public view returns(bool) {
    return inSupport[factId];
  }
  
  function argumentIdFor(uint factId) public view returns(uint) {
    return argumentId[factId];
  }

  function mine() public view returns(uint[] memory) {
    return factsByDebaterAddress[msg.sender];
  }

  function alreadyVotedFor(uint factId) public view returns (bool) {
    uint[] memory siblingFacts = factsByArgId[argumentId[factId]];
    uint numSiblings = siblingFacts.length;
    bool _alreadyVoted = false;
    for (uint i = 0; i < numSiblings; i++) {
      if (!_alreadyVoted && alreadyVoted[siblingFacts[i]][msg.sender]) {
        _alreadyVoted = true;
      }
    }
    return _alreadyVoted;
  }

  function commitTruthTo(uint factId, address debater) public onlyTruth {
    factsByDebaterAddress[debater].push(factId);
    alreadyVoted[factId][debater] = true;
    voterAddresses[factId].push(debater);
    relevanceScore[factId] += 1;
  }

  function score(uint argId) public onlyTruth returns (uint[] memory) {
    uint numArgFacts = factsByArgId[argId].length;
    uint totalScore = 0;
    uint[] memory scores = new uint[](numArgFacts);
    for (uint i = 0; i < numArgFacts; i++) {
      uint factId = factsByArgId[argId][i];
      uint scoreForFact = relevanceScore[factId];
      totalScore += scoreForFact;
      scores[i] = scoreForFact;
    }
    for (uint j = 0; j < numArgFacts; j++) {
      scores[j] = (scores[j] * 100) / totalScore;
      uint factId = factsByArgId[argId][j];
      address[] memory voters = voterAddresses[factId];
      uint numVoters = voters.length;
      for (uint k = 0; k < numVoters; k++) {
        truthEarnedByArgId[argId].push(TruthEarned(voters[k], 100 + scores[j]));
      }
    }
    return scores;
  }
}
