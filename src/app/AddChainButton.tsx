import React from "react";

const AddNetworkButton = () => {
  const handleAddNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xe839",
            chainName: "rising-impact-3e40rbadm1",
            rpcUrls: ["https://rpc-rising-impact-3e40rbadm1.t.conduit.xyz"],
            nativeCurrency: {
              name: "Custom Token",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: [
              "https://explorer-rising-impact-3e40rbadm1.t.conduit.xyz",
            ],
          },
        ],
      });
      alert("Network added successfully!");
    } catch (error) {
      console.error("Error adding network:", error);
      alert("Failed to add network");
    }
  };

  return (
    <button
      onClick={handleAddNetwork}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Add ReviewChain to Network to MetaMask
    </button>
  );
};

export default AddNetworkButton;