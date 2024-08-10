import React, { useState } from "react";
import {
  defineChain,
  sendTransaction,
  getContract,
  prepareContractCall,
  useActiveAccount,
} from "thirdweb";
import { client } from "./client";

const contractAddress = "0xeB424584a38b4fd9E4F894A8CBaA0b969125526D";
const contractABI = [
  // Only include the ABI for the submitReview function
  "function submitReview(string _content) external",
];

const SubmitReviewButton = ({ account }) => {
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitReview = async () => {
    const myChain = defineChain({
      id: "59449",
      rpc: "https://rpc-rising-impact-3e40rbadm1.t.conduit.xyz",
    });

    const contract = getContract({
      address: "0xeB424584a38b4fd9E4F894A8CBaA0b969125526D",
      chain: myChain,
      client,
    });

    const _content = review;

    const transaction = prepareContractCall({
      contract,
      method: "function submitReview(string _content)",
      params: [_content],
    });

    const { transactionHash } = await sendTransaction({
      account,
      transaction,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={submitReview}
          disabled={isLoading || !review}
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default SubmitReviewButton;
