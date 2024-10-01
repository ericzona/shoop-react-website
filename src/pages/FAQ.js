// src/components/FAQ.js
import React from 'react';

const FAQ = ({ topHolders = [] }) => {  // Default empty array for topHolders
  const supply = { uiAmount: 999791351.27 }; // Hardcoded adjusted total supply

  return (
    <div className="p-8 font-prometo text-white">
      {/* FAQ Section */}
      <div className="mb-8">
        <h1 className="text-3xl text-neonRed mb-4 font-arcade">
          Frequently Asked Questions
        </h1>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Q:</strong> What is $SHOOP?
            <br />
            <strong>A:</strong> $SHOOP is a token that lets you reclaim and convert your unwanted tokens.
          </li>
          <li>
            <strong>Q:</strong> How do I connect my wallet?
            <br />
            <strong>A:</strong> Use the DApp page to connect your Phantom, Solflare, or WalletConnect wallet.
          </li>
        </ul>
      </div>

      {/* Top Holders Section */}
      <div className="p-4 bg-black border-2 border-neonRed rounded-lg shadow-md">
        <h2 className="text-2xl text-neonYellow mb-4">Top $SHOOP Holders</h2>
        {topHolders.length > 0 ? (
          <ul className="list-none space-y-3">
            {topHolders.map((holder, index) => (
              <li key={index} className="p-2 border border-neonFuschia rounded bg-gray-800">
                <p><strong>Rank:</strong> {holder.rank}</p>
                <p><strong>Wallet:</strong> {`${holder.address.slice(0, 5)}...${holder.address.slice(-5)}`}</p>
                <p><strong>$SHOOP Balance:</strong> {holder.amount.toFixed(2)} tokens</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No holders found.</p>
        )}
      </div>

      {/* Token Supply Display */}
      <div className="mt-6">
        <h3 className="text-lg text-neonGreen">
          Total Supply: {supply.uiAmount.toLocaleString()} $SHOOP Tokens
        </h3>
      </div>
    </div>
  );
};

export default FAQ;
