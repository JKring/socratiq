// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Reviewable {
  uint[] activeItems;
  mapping(uint => uint) activeItemsIndex;
  
  uint[] requiringReviewItems;
  mapping(uint => uint) requiringReviewItemsIndex; 

  function addToRequiringReview(uint itemId) internal {
    requiringReviewItemsIndex[itemId] = requiringReviewItems.length;
    requiringReviewItems.push(itemId);
  }

  function removeFromRequiringReview(uint itemId) internal {
    if (requiringReviewItems.length > 1) {
      uint index = requiringReviewItemsIndex[itemId];
      uint lastId = requiringReviewItems[requiringReviewItems.length - 1];
      requiringReviewItems[index] = lastId;
      requiringReviewItemsIndex[lastId] = index;
    }
    requiringReviewItems.pop();
  }

  function addToActive(uint itemId) internal {
    activeItemsIndex[itemId] = activeItems.length;
    activeItems.push(itemId);
  }

  function removeFromActive(uint itemId) internal {
    if (activeItems.length > 1) {
      uint index = activeItemsIndex[itemId];
      uint lastId = activeItems[activeItems.length - 1];
      activeItems[index] = lastId;
      activeItemsIndex[lastId] = index;
    }
    activeItems.pop();
  }
}