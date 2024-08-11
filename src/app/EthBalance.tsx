import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

const ETHBalance = ({ address }) => {
  const [balance1, setBalance1] = useState(null);
  const [balance2, setBalance2] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response1 = await axios.get(
          `https://eth-sepolia.blockscout.com/api?module=account&action=balance&address=${address}&apikey=${process.env.BLOCKSCOUT_API_KEY}`
        );
        const balance1Wei = response1.data.result;
        const balance1Ether = (parseInt(balance1Wei, 10) / 1e18).toFixed(18);

        const provider2 = new ethers.JsonRpcProvider(
          "https://rpc-rising-impact-3e40rbadm1.t.conduit.xyz"
        );
        const balance2Big = await provider2.getBalance(address);
        const balance2Ether = ethers.formatEther(balance2Big);

        setBalance1(balance1Ether);
        setBalance2(balance2Ether);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, [address]);

  const canSubmitReview = balance2 !== null && parseFloat(balance2) > 0;

  return (
    <div className="p-4">
      <div className="flex space-x-4 justify-center">
        <div className="bg-gray-100 p-4 rounded w-1/4">
          <h2 className="text-xl font-semibold">ETH sepolia</h2>
          <p className="text-lg">
            {balance1 !== null ? `${balance1} ETH` : "Loading..."}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded w-1/4">
          <h2 className="text-xl font-semibold">ReviewChain</h2>
          <p className="text-lg">
            {balance2 !== null ? `${balance2} ETH` : "Loading..."}
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <p
          className={`text-lg font-semibold ${
            canSubmitReview ? "text-green-600" : "text-red-600"
          }`}
        >
          {!canSubmitReview &&
            "You can only submit a review if you have bridged ETH into ReviewChain."}
        </p>
      </div>
    </div>
  );
};

export default ETHBalance;
