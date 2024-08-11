// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReviewContract {
    struct Review {
        address reviewer;
        string content;
        uint256 timestamp;
    }

    Review[] public reviews;

    event ReviewSubmitted(address indexed reviewer, string content, uint256 timestamp);

    // Function to submit a review
    function submitReview(string calldata _content) external {
        reviews.push(Review({
            reviewer: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));

        emit ReviewSubmitted(msg.sender, _content, block.timestamp);
    }

    // Function to get the number of reviews
    function getReviewCount() external view returns (uint256) {
        return reviews.length;
    }

    // Function to get a review by index
    function getReview(uint256 _index) external view returns (address reviewer, string memory content, uint256 timestamp) {
        require(_index < reviews.length, "Index out of bounds");
        Review storage review = reviews[_index];
        return (review.reviewer, review.content, review.timestamp);
    }

    // Function to get all reviews (not recommended for large lists)
    function getAllReviews() external view returns (Review[] memory) {
        return reviews;
    }
}