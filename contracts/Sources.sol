// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";
import "./TruthOwnable.sol";

contract Sources is TruthOwnable {
  uint constant unquestionabilityThresholdPercent = 90;
  uint constant biasedThresholdPercent = 50;
  uint constant sourceIdentificationRewardPercent = 130;

  mapping (uint => uint[]) byFactId;
  mapping (address => uint[]) byDebaterAddress;

  uint numSources;

  mapping (uint => string) url;

  mapping (uint => uint) sourceToFactId;

  mapping (uint => uint) supportingTruth;
  mapping (uint => mapping(address => uint)) supportingTruthByDebaterAddress;
  mapping (uint => address[]) supporters;

  mapping (uint => uint) opposingTruth;
  mapping (uint => mapping(address => uint)) opposingTruthByDebaterAddress;
  mapping (uint => address[]) opposers;

  mapping (uint => TruthEarned[]) truthEarnedByFact;

  constructor() {
    numSources = 0;
  }

  function create(uint factId, string memory _url) public {
    numSources ++;
    uint sourceId = 0 + numSources;
    url[factId] = _url;
    sourceToFactId[sourceId] = factId;
    byFactId[factId].push(sourceId);
    byDebaterAddress[msg.sender].push(sourceId);
  }

  function forFact(uint factId) public view returns(uint[] memory) {
    return byFactId[factId];
  }

  function mine() public view returns(uint[] memory) {
    return byDebaterAddress[msg.sender];
  }

  function truthEarned(uint factId) public view returns(TruthEarned[] memory) {
    return truthEarnedByFact[factId];
  }
  
  function factIdFor(uint sourceId) public view returns(uint) {
    return sourceToFactId[sourceId];
  }

  function commitTruthTo(uint sourceId, uint points, bool inSupport, address debater) public onlyTruth {
    byDebaterAddress[debater].push(sourceId);
    if (inSupport) {
      if (supportingTruthByDebaterAddress[sourceId][debater] == 0) supporters[sourceId].push(debater);
      supportingTruthByDebaterAddress[sourceId][debater] += points;
      supportingTruth[sourceId] += points;
    } else {
      if (opposingTruthByDebaterAddress[sourceId][debater] == 0) opposers[sourceId].push(debater);
      opposingTruthByDebaterAddress[sourceId][debater] += points;
      opposingTruth[sourceId] += points;
    }
  }

  function score(uint factId) public onlyTruth returns (uint) {
    uint[] memory factSources = forFact(factId);
    uint numFactSources = factSources.length;
    uint sourceScore = 0;
    for (uint j = 0; j < numFactSources; j++) {
      uint sourceId = factSources[j];
      uint supporting = supportingTruth[sourceId];
      uint opposing = opposingTruth[sourceId];
      uint supportingPercent;
      uint opposingPercent;
      if (supporting + opposing == 0) {
        supportingPercent = 0;
        opposingPercent = 0;
      } else {
        supportingPercent = (supporting * 100)/ (supporting + opposing);
        opposingPercent = (opposing * 100) / (supporting + opposing);
      }
      if (supportingPercent >= unquestionabilityThresholdPercent) {
        sourceScore += supporting;
        for (uint k = 0; k < supporters[sourceId].length; k++) {
          address supporter = supporters[sourceId][k];
          uint committed = supportingTruthByDebaterAddress[sourceId][supporter];
          truthEarnedByFact[factId].push(
            TruthEarned(supporter, (committed * sourceIdentificationRewardPercent) / 100)
          );
        }
      } else if (opposingPercent >= biasedThresholdPercent) {
        for (uint k = 0; k < opposers[sourceId].length; k++) {
          address opposer = opposers[sourceId][k];
          uint committed = opposingTruthByDebaterAddress[sourceId][opposer];
          truthEarnedByFact[factId].push(
            TruthEarned(opposer, (committed * sourceIdentificationRewardPercent) / 100)
          );
        }
      }
    }
    return sourceScore;
  }
}
