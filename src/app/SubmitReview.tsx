import React, { useState } from "react";
import {
  defineChain,
  sendTransaction,
  getContract,
  prepareContractCall,
} from "thirdweb";
import { client } from "./client";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "./actions/verify";

const SubmitReviewButton = ({ account }) => {
  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

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

  const { setOpen } = useIDKit();

  const onSuccess = (result: ISuccessResult) => {
    submitReview();
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log(
      "Proof received from IDKit, sending to backend:\n",
      JSON.stringify(result)
    ); // Log the proof from IDKit to the console for visibility
    const data = await verify(result);
    if (data.success) {
      console.log("Successful response from backend:\n", JSON.stringify(data)); // Log the response from our backend for visibility
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <IDKitWidget
        action={action}
        app_id={app_id}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Device}
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        {!account ? (
          <p className="mb-4 text-red-500 flex items-center">
            <span className="mr-2 text-xl">❌</span>
            Please connect your wallet and bridge to ReviewChain before
            submitting a review.
          </p>
        ) : (
          <p className="mb-4 text-green-500 flex items-center">
            <span className="mr-2 text-xl">✅</span>
            You can now submit your review.
          </p>
        )}
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setOpen(true)}
          disabled={isLoading || !review || !account}
          className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
            isLoading || !account
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
        <p className="mt-2 text-gray-500 text-sm">
          Note: You can verify using this{" "}
          <a
            href="https://simulator.worldcoin.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            simulator
          </a>
          .
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default SubmitReviewButton;
