// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Arguments.sol";
import "./Facts.sol";
import "./Sources.sol";

struct TruthEarned {
  address voter;
  uint points;
}

contract Truth {
  uint constant baseUnits = 100;
  uint constant initialAllocation = 3 * baseUnits;
  uint constant numFirstModerators = 8;
  uint constant firstModeratorsAllocation = 100 * baseUnits;
  uint constant moderatorThreshold = 95 * baseUnits;

  uint totalInitialized;

  mapping (address => uint) scores;
  mapping (address => bool) initialized;

  address argumentsAddress;
  address factsAddress;
  address sourcesAddress;
 
  constructor(address _argumentsAddress, address _factsAddress, address _sourcesAddress) {
    totalInitialized = 0;
    argumentsAddress = _argumentsAddress;
    factsAddress = _factsAddress;
    sourcesAddress = _sourcesAddress;
  }

  modifier onlyModerator() {
    require(isModerator(msg.sender), "Can only be called by a Moderator");
    _;
  }

  function getPoints() public view returns(uint) {
    return scores[msg.sender];
  }

  function applyTruthEarned(TruthEarned[] memory truthEarned) private {
    uint numTruthEarned = truthEarned.length;
    for (uint i = 0; i < numTruthEarned; i++) {
      TruthEarned memory earning = truthEarned[i];
      scores[earning.voter] += earning.points;
    }
  }

  function scoreArgument(uint argumentId) public onlyModerator {
    Arguments arguments = Arguments(argumentsAddress);
    arguments.endDebating(argumentId);
    Facts facts = Facts(factsAddress);
    Sources sources = Sources(sourcesAddress);
    uint[] memory argumentFacts = facts.forArgument(argumentId);
    uint[] memory relevanceScores = facts.score(argumentId);
    applyTruthEarned(facts.truthEarned(argumentId));
    uint numFacts = argumentFacts.length;
    uint totalSupporting = 0;
    uint totalOpposing = 0;
    for (uint i = 0; i < numFacts; i++) {
      uint factScore = sources.score(argumentFacts[i]) * relevanceScores[i];
      applyTruthEarned(sources.truthEarned(argumentFacts[i]));
      if (facts.isSupporting(argumentFacts[i])) {
        totalSupporting += factScore;
      } else {
        totalOpposing += factScore;
      }
    }
    // Allocate DebateCoin based on totalSupporting vs totalOpposing
  }

  function deplete(uint points) private returns(bool hasEnough) {
    if (scores[msg.sender] >= points) {
      scores[msg.sender] -= points;
      return true;
    } else {
      return false;
    }
  }

  function commitToFact(uint factId) public returns(bool) {
    Facts facts = Facts(factsAddress);
    require(!facts.alreadyVotedFor(factId));
    Arguments arguments = Arguments(argumentsAddress);
    require(arguments.isDebating(facts.argumentIdFor(factId)), "Argument Status must be Debating");
    bool hasEnough = deplete(baseUnits);
    if (hasEnough) facts.commitTruthTo(factId, msg.sender);
    return hasEnough;
  }

  function commitToSource(uint sourceId, uint points, bool inSupport) public returns(bool) {
    Sources sources = Sources(sourcesAddress);
    Facts facts = Facts(factsAddress);
    Arguments arguments = Arguments(argumentsAddress);
    require(arguments.isDebating(facts.argumentIdFor(sources.factIdFor(sourceId))), "Argument Status must be Debating");
    bool hasEnough = deplete(points);
    if (hasEnough) sources.commitTruthTo(sourceId, points, inSupport, msg.sender);
    return hasEnough;
  }

  function initAccount() public returns(bool isNew) {
    if (initialized[msg.sender] == true) {
      return false;
    } else {
      initialized[msg.sender] = true;
      totalInitialized += 1;
      uint allocation = totalInitialized < numFirstModerators ? firstModeratorsAllocation : initialAllocation;
      scores[msg.sender] = allocation;
      return true;
    }
  }

  function isModerator(address addr) public view returns(bool) {
    return scores[addr] > moderatorThreshold;
  }
}
