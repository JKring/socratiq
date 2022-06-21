// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";
import "./TruthOwnable.sol";
import "./Reviewable.sol";

contract Arguments is TruthOwnable, Reviewable  {
  struct Argument {
    string text;
    Status status;
    address creator;
  }
  // CAUTION! DUPLICATED CODE!
  // IF YOU CHANGE THESE CONSTANTS, ALSO CHANGE
  // ARGUMENT_STATUSES and MAX_SUBMISSION_LENGTH IN client/src/Constants.js
  enum Status{ NEEDS_REVIEW, REJECTED, BETTING, DEBATING, FINISHED }
  Status constant defaultStatus = Status.NEEDS_REVIEW;
  uint constant maxArgumentLength = 280;

  uint[] allArguments;
  uint numArguments;
  
  mapping (address => uint[]) byDebaterAddress;

  mapping (uint => Argument) arguments;

  constructor() {
    numArguments = 0;
  }

  function create(string memory text) public {
    uint textLength = bytes(text).length;
    require(textLength > 0, "Argument must exist");
    require(textLength <= maxArgumentLength, "Argument is too long");
    numArguments ++;
    uint argumentId = 0 + numArguments;
    byDebaterAddress[msg.sender].push(argumentId);
    arguments[argumentId] = Argument(text, defaultStatus, msg.sender);
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

  function getDetails(uint argumentId) public view returns (string memory, Status, address) {
    Argument memory argument = arguments[argumentId];
    return (argument.text, argument.status, argument.creator);
  }

  function getStatus(uint argumentId) public view returns (Status) {
    return arguments[argumentId].status;
  }
  
  function isDebating(uint argumentId) public view returns (bool) {
    return arguments[argumentId].status == Status.DEBATING;
  }

  function approve(uint argumentId) public onlyModerator {
    require(arguments[argumentId].status == Status.NEEDS_REVIEW, "Argument Status must be in Needs Review");
    arguments[argumentId].status = Status.BETTING;
    removeFromRequiringReview(argumentId);
    addToActive(argumentId);
  }

  function startDebating(uint argumentId) public onlyModerator {
    require(arguments[argumentId].status == Status.BETTING, "Argument Status must be in Betting");
    arguments[argumentId].status = Status.DEBATING;
  }

  function reject(uint argumentId) public onlyModerator {
    require(arguments[argumentId].status == Status.NEEDS_REVIEW, "Argument Status must be in Needs Review");
    arguments[argumentId].status = Status.REJECTED;
    removeFromRequiringReview(argumentId);
  }

  function endDebating(uint argumentId) public onlyTruth {
    require(isDebating(argumentId), "Argument Status must be Debating");
    arguments[argumentId].status = Status.FINISHED;
    removeFromActive(argumentId);
  }
}
