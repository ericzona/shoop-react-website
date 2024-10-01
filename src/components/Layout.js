import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from '../Navbar';
import ScrollingTicker from './ScrollingTicker';
import FAQ from '../pages/FAQ'; 

import { Connection, PublicKey } from '@solana/web3.js';

const Layout = ({ children }) => {
  const [topHolders, setTopHolders] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const QUICKNODE_URL = 'https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31';

  // Memoize the connection object
  const connection = useMemo(() => new Connection(QUICKNODE_URL), [QUICKNODE_URL]);

  // Memoize the tokenMintAddress
  const tokenMintAddress = useMemo(() => new PublicKey('3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'), []);

  // Fetch Top Holders with useCallback to memoize
  const fetchTopHolders = useCallback(async () => {
    try {
      setLoading(true);
      const largestAccounts = await connection.getTokenLargestAccounts(tokenMintAddress);
      
      if (largestAccounts?.value) {
        const topHolders = largestAccounts.value.map((account, index) => ({
          address: account.address.toBase58(),
          amount: account.uiAmount,
          rank: index === 0 ? '00 - The $SHOOP Bonding Curve For Raydium' : `${index + 1}`,
        }));
        setTopHolders(topHolders);
      } else {
        setError('Error fetching top holders.');
      }
    } catch (error) {
      console.error('Error fetching top holders:', error);
      setError('Unable to fetch top holders.');
    } finally {
      setLoading(false);
    }
  }, [connection, tokenMintAddress]);

  // Fetch Recent Purchases with useCallback to memoize
  const fetchRecentPurchases = useCallback(async () => {
    try {
      setLoading(true);
      const confirmedSignatures = await connection.getSignaturesForAddress(tokenMintAddress, { limit: 10 });
      const purchases = [];
  
      for (let signature of confirmedSignatures) {
        const transaction = await connection.getParsedTransaction(signature.signature, { maxSupportedTransactionVersion: 0 });
  
        if (transaction) {
          const accountKeys = transaction.transaction.message.accountKeys;
  
          // Find SOL amount by checking the change in balance before and after
          const preBalance = transaction.meta.preBalances[0] / 1e9; // Convert lamports to SOL
          const postBalance = transaction.meta.postBalances[0] / 1e9; // Convert lamports to SOL
          const solAmount = preBalance - postBalance; // Difference = purchase amount
  
          if (solAmount > 0.05 && accountKeys.length > 0) {
            purchases.push({
              signature: signature.signature,
              amount: solAmount,
              wallet: accountKeys[0].pubkey.toBase58(),
            });
          }
        }
      }
      setRecentPurchases(purchases);
    } catch (error) {
      console.error('Error fetching recent purchases:', error);
      setError('Unable to fetch recent purchases.');
    } finally {
      setLoading(false);
    }
  }, [connection, tokenMintAddress]);
  

  useEffect(() => {
    fetchTopHolders();
    fetchRecentPurchases();
  }, [fetchTopHolders, fetchRecentPurchases]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      {children}
      <FAQ topHolders={topHolders} />
      <ScrollingTicker recentPurchases={recentPurchases} />
    </div>
  );
};

export default Layout;
