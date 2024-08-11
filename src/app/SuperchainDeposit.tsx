import React, { useEffect, useState } from "react";
import axios from "axios";

const SuperchainDeposit = ({ address }) => {
  const [transactions, setTransactions] = useState([]);
  const IMPLEMENTATION_ADDRESS = "0xC0d3c0d3c0D3c0d3C0D3c0D3C0d3C0D3C0D30010";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://explorer-rising-impact-3e40rbadm1.t.conduit.xyz/api/v2/addresses/${address}/internal-transactions`
        );
        const filteredTransactions = response.data.items.filter((tx) => {
          if (tx.from.implementations && tx.from.implementations.length > 0) {
            return tx.from.implementations.some(
              (impl) => impl.address === IMPLEMENTATION_ADDRESS
            );
          }
          return false;
        });
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [address]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  };

  const formatValue = (valueInWei) => {
    return (parseInt(valueInWei, 10) / 1e18).toFixed(6);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-800">
        Bridge Deposit Transaction
      </h1>
      {transactions.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Block</th>
              <th className="py-2 px-4 border-b">Timestamp (PST)</th>
              <th className="py-2 px-4 border-b">Transaction Hash</th>
              <th className="py-2 px-4 border-b">Value (Ether)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.transaction_hash} className="text-gray-700">
                <td className="py-2 px-4 border-b">{tx.block}</td>
                <td className="py-2 px-4 border-b">
                  {formatDate(tx.timestamp)}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={`https://explorer-rising-impact-3e40rbadm1.t.conduit.xyz/tx/${tx.transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {tx.transaction_hash}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{formatValue(tx.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No deposit transactions found.</p>
      )}
    </div>
  );
};

export default SuperchainDeposit;
