import React from "react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
  status: "pending" | "confirmed";
  chain: string;
}

const transactions: Transaction[] = [
  {
    hash: "0x1234abcd5678efgh9012ijkl3456mnop",
    from: "0xABC123...567DEF",
    to: "0x987ZYX...654WVU",
    value: "2.5 ETH",
    timestamp: "2024-02-01 14:30",
    status: "confirmed",
    chain: "Ethereum",
  },
  {
    hash: "0x7890mnop1234qrst5678uvwx9012yzab",
    from: "0xDEF789...321GHI",
    to: "0xABC123...567DEF",
    value: "1.2 ETH",
    timestamp: "2024-02-01 15:10",
    status: "pending",
    chain: "Ethereum",
  },
  {
    hash: "0x4567ghij8901klmn2345opqr6789stuv",
    from: "0xXYZ987...654UVW",
    to: "0xABC123...567DEF",
    value: "0.8 ETH",
    timestamp: "2024-02-01 16:45",
    status: "confirmed",
    chain: "Ethereum",
  },
];

const TransactionHistory = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction History</h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Tx Hash</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">From</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">To</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Amount</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Chain</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Timestamp</th>
            <th className="px-4 py-2 border-b text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <span className="font-mono">{tx.hash.slice(0, 10)}...</span>
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <span className="font-mono">{tx.from}</span>
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <span className="font-mono">{tx.to}</span>
              </td>
              <td className={`px-4 py-2 border-b text-sm font-semibold ${tx.from.includes("ABC123") ? "text-red-500" : "text-green-500"}`}>
                {tx.from.includes("ABC123") ? `- ${tx.value}` : `+ ${tx.value}`}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{tx.chain}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{tx.timestamp}</td>
              <td className={`px-4 py-2 border-b text-sm font-semibold ${tx.status === "confirmed" ? "text-green-600" : "text-yellow-500"}`}>
                {tx.status === "confirmed" ? "✅ Confirmed" : "⏳ Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
