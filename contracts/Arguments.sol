// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";
import "./TruthOwnable.sol";
import "./Reviewable.sol";

contract Arguments is TruthOwnable, Reviewable  {
  enum Status{ NEEDS_REVIEW, REJECTED, BETTING, DEBATING, FINISHED }
  Status constant defaultStatus = Status.NEEDS_REVIEW;

  uint[] allArguments;
  uint numArguments;
  
  mapping (address => uint[]) byDebaterAddress;

  mapping (uint => Status) statuses;
  mapping (uint => string) texts;

  constructor() {
    numArguments = 0;
  }

  function create(string memory _text) public {
    numArguments ++;
    uint argumentId = 0 + numArguments;
    byDebaterAddress[msg.sender].push(argumentId);
    statuses[argumentId] = defaultStatus;
    texts[argumentId] = _text;
    addToRequiringReview(argumentId);
  }

  function active() public view returns(uint[] memory) {
    return activeItems;
  }

  function requiringReview() public view returns(uint[] memory) {
    return requiringReviewItems;
  }

  function mine() public view returns(uint[] memory) {
    return byDebaterAddress[msg.sender];
  }

  function getStatus(uint argumentId) public view returns (Status) {
    return statuses[argumentId];
  }
  
  function isDebating(uint argumentId) public view returns (bool) {
    return statuses[argumentId] == Status.DEBATING;
  }

  function approve(uint argumentId) public onlyModerator {
    require(statuses[argumentId] == Status.NEEDS_REVIEW, "Argument Status must be in Needs Review");
    statuses[argumentId] = Status.BETTING;
    removeFromRequiringReview(argumentId);
    addToActive(argumentId);
  }

  function startDebating(uint argumentId) public onlyModerator {
    require(statuses[argumentId] == Status.BETTING, "Argument Status must be in Betting");
    statuses[argumentId] = Status.DEBATING;
  }

  function reject(uint argumentId) public onlyModerator {
    require(statuses[argumentId] == Status.NEEDS_REVIEW, "Argument Status must be in Needs Review");
    statuses[argumentId] = Status.REJECTED;
    removeFromRequiringReview(argumentId);
  }

  function endDebating(uint argumentId) public onlyTruth {
    require(isDebating(argumentId), "Argument Status must be Debating");
    statuses[argumentId] = Status.FINISHED;
    removeFromActive(argumentId);
  }
}
