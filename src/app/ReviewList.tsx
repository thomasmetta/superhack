import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0xeB424584a38b4fd9E4F894A8CBaA0b969125526D";
const contractABI = [
  "function getAllReviews() external view returns (tuple(address reviewer, string content, uint256 timestamp)[] memory)",
];

const ReadReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          "https://rpc-rising-impact-3e40rbadm1.t.conduit.xyz"
        );

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );

        const reviewsArray = await contract.getAllReviews();

        const formattedReviews = reviewsArray.map((review) => ({
          reviewer: review.reviewer,
          content: review.content,
          timestamp: new Date(Number(review.timestamp) * 1000).toLocaleString(),
        }));

        setReviews(formattedReviews);
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Reviews</h1>
      {loading && <p className="text-gray-600">Loading reviews...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p className="text-gray-600">No reviews found.</p>
      )}
      {reviews.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 border-b">Reviewer</th>
              <th className="py-3 px-4 border-b">Review</th>
              <th className="py-3 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-3 px-4 border-b">{review.reviewer}</td>
                <td className="py-3 px-4 border-b">{review.content}</td>
                <td className="py-3 px-4 border-b">{review.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReadReviews;
