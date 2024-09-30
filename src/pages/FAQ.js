import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const FAQ = () => {
  const [topHolders, setTopHolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [supply, setSupply] = useState({ amount: 0, uiAmount: 0 });

  const QUICKNODE_URL = 'https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31';
  const connection = useMemo(() => new Connection(QUICKNODE_URL), [QUICKNODE_URL]);

  const tokenMintAddress = useMemo(() => new PublicKey('3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'), []);

  const fetchTopHolders = useCallback(async () => {
    try {
      setLoading(true);
      const largestAccounts = await connection.getTokenLargestAccounts(tokenMintAddress);

      if (largestAccounts && largestAccounts.value) {
        const topHolders = largestAccounts.value.map((account, index) => ({
          address: account.address.toBase58(),
          amount: account.uiAmount,
          percentage: ((account.uiAmount / supply.amount) * 100).toFixed(2),
          rank: index === 0 ? "The $SHOOP Bonding Curve For Raydium" : `${index + 1}`
        }));
        setTopHolders(topHolders);
      } else {
        setError('Error processing top holders data.');
      }
    } catch (error) {
      console.error('Error fetching top holders:', error);
      setError('Unable to fetch top holders. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [connection, tokenMintAddress, supply.amount]); // Stable dependencies

  const fetchTokenSupply = useCallback(async () => {
    try {
      setLoading(true);
      const response = await connection.getTokenSupply(tokenMintAddress);

      if (response.value) {
        setSupply(response.value);
      } else {
        setSupply({ amount: 0, uiAmount: 0 });
        setError('Error processing token supply data.');
      }
    } catch (error) {
      console.error('Error fetching token supply:', error);
      setError('Unable to fetch token supply. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [connection, tokenMintAddress]); // Stable dependencies

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTopHolders();
      fetchTokenSupply();
    }, 2000); // Throttling for 2 seconds between requests

    return () => clearTimeout(timer); // Cleanup timeout
  }, [fetchTopHolders, fetchTokenSupply]); // Include memoized functions as dependencies

  return (
    <div className="p-8 font-prometo text-white">
      <div className="mb-8">
        <h1 className="text-3xl text-neonRed mb-4 font-arcade">Frequently Asked Questions</h1>
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
        {loading ? (
          <p className="text-neonFuschia">Loading top holders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="list-none space-y-3">
            {topHolders.length > 0 ? (
              topHolders.map((holder, index) => (
                <li key={index} className="p-2 border border-neonFuschia rounded bg-gray-800">
                  <p><strong>Rank:</strong> {holder.rank}</p>
                  <p><strong>Wallet:</strong> {`${holder.address.slice(0, 5)}...${holder.address.slice(-5)}`}</p>
                  <p><strong>$SHOOP Balance:</strong> {holder.amount.toFixed(2)} tokens</p>
                  <p><strong>Percentage:</strong> {holder.percentage}%</p>
                </li>
              ))
            ) : (
              <p className="text-white">No holders with over 1% of supply found.</p>
            )}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg text-neonGreen">
          Total Supply: {supply.amount || 0} tokens
        </h3>
        <h3 className="text-lg text-neonGreen">
          Total Supply (Adjusted): {supply.uiAmount ? supply.uiAmount.toFixed(2) : 0} $SHOOP
        </h3>
      </div>
    </div>
  );
};

export default FAQ;
