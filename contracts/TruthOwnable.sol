// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Truth.sol";

abstract contract TruthOwnable {
  Truth truth;
  address truthAddress;
  address owner;

  constructor() {
    owner = msg.sender;
  }

  function setTruthAddress(address _truthAddress) public onlyOwner {
    truthAddress = _truthAddress;
    truth = Truth(_truthAddress);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "TruthOwnable: can only be called by Owner");
    _;
  }

  modifier onlyTruth() {
    require(msg.sender == truthAddress, "TruthOwnable: can only be called by Truth");
    _;
  }

  modifier onlyModerator() {
    require(truth.isModerator(msg.sender), "TruthOwnable: can only be called by a Moderator");
    _;
  }
}