import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from '../Navbar';
import ScrollingTicker from './ScrollingTicker';
import { Connection, PublicKey } from '@solana/web3.js';

const Layout = ({ children }) => {
	const [topHolders, setTopHolders] = useState([]);
	const [recentPurchases, setRecentPurchases] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [solPrice, setSolPrice] = useState(0); // SOL price from CoinGecko
	const [totalSupply] = useState(999791351.27); // Hardcoded total $SHOOP supply
	const [shoopSolPrice, setShoopSolPrice] = useState(0); // Calculated SHOOP price

	const QUICKNODE_URL =
		'https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31';
	const connection = useMemo(
		() => new Connection(QUICKNODE_URL),
		[QUICKNODE_URL]
	);
	const tokenMintAddress = useMemo(
		() => new PublicKey('3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'),
		[]
	);

	// Function to fetch the top $SHOOP holders
	const fetchTopHolders = useCallback(async () => {
		try {
			setLoading(true);
			const largestAccounts = await connection.getTokenLargestAccounts(
				tokenMintAddress
			);
			if (largestAccounts?.value) {
				const topHolders = largestAccounts.value.map((account, index) => ({
					address: account.address.toBase58(),
					amount: account.uiAmount,
					rank:
						index === 0
							? '00 - The $SHOOP Bonding Curve For Raydium'
							: `Rank: ${index + 1}`, // Correct rank
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

	// Function to fetch recent purchases
	const fetchRecentPurchases = useCallback(async () => {
    try {
      const confirmedSignatures = await connection.getSignaturesForAddress(tokenMintAddress, { limit: 10 });
      console.log('Confirmed Signatures:', confirmedSignatures);
  
      const recentPurchasesData = await Promise.all(
        confirmedSignatures.map(async (signatureObj) => {
          const transaction = await connection.getParsedTransaction(signatureObj.signature, {
            maxSupportedTransactionVersion: 0,
          });
          console.log('Fetched Transaction:', transaction);
  
          if (transaction && transaction.meta && transaction.meta.preTokenBalances && transaction.meta.postTokenBalances) {
            const preTokenBalances = transaction.meta.preTokenBalances;
            const postTokenBalances = transaction.meta.postTokenBalances;
  
            console.log('preToken Balances:', preTokenBalances);
            console.log('postToken Balances:', postTokenBalances);
  
            // We need to filter only relevant $SHOOP transactions
            if (preTokenBalances.length === 0 || postTokenBalances.length === 0) {
              console.log('Skipping transaction: No valid $SHOOP balances found');
              return null; // Skip if no valid balances
            }
  
            const preShoopBalance = preTokenBalances[0]?.uiTokenAmount?.uiAmount || 0;
            const postShoopBalance = postTokenBalances[0]?.uiTokenAmount?.uiAmount || 0;
            const shoopReceived = postShoopBalance - preShoopBalance;
  
            if (shoopReceived <= 0) {
              console.log('Skipping transaction: No $SHOOP received');
              return null; // Skip transactions with no $SHOOP received
            }
  
            const solSpent = transaction.meta.fee / 1e9; // Fee in SOL
  
            return {
              wallet: postTokenBalances[0]?.owner || 'Unknown', // Wallet address
              amount: solSpent, // SOL spent
              shoopAmount: shoopReceived > 0 ? shoopReceived : 0, // $SHOOP tokens received
            };
          }
          return null; // Skip if no preTokenBalances or postTokenBalances
        })
      );
  
      setRecentPurchases(recentPurchasesData.flat().filter(Boolean)); // Flatten and remove null values
    } catch (error) {
      console.error('Error fetching recent purchases:', error);
    }
  }, [connection, tokenMintAddress]);
  

	// Fetch SOL price from CoinGecko
	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
		)
			.then((response) => response.json())
			.then((data) => setSolPrice(data.solana.usd))
			.catch((error) => console.error('Error fetching SOL price:', error));
	}, []);

	// Calculate $SHOOP price based on the most recent purchase
	useEffect(() => {
		if (recentPurchases.length > 0) {
			const mostRecentBuy = recentPurchases[0]; // Get the latest buy transaction
			const shoopTokensBought = mostRecentBuy.shoopAmount; // Shoop tokens received
			const solSpent = mostRecentBuy.amount; // SOL spent

			if (shoopTokensBought > 0 && solSpent > 0) {
				const calculatedShoopSolPrice = solSpent / shoopTokensBought;
				setShoopSolPrice(calculatedShoopSolPrice); // Store the calculated price
			}
		}
	}, [recentPurchases]);

	// Fetch top holders and recent purchases when component mounts
	useEffect(() => {
		fetchTopHolders();
		fetchRecentPurchases();
	}, [fetchTopHolders, fetchRecentPurchases]);

	if (loading) return <p>Loading data...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<Navbar />
			<p style={{ color: 'red' }}>
				This is Layout.js rendering the FAQ component
			</p>{' '}
			{/* Dummy text */}
			{children && React.isValidElement(children)
				? React.cloneElement(children, {
						topHolders,
						solPrice,
						shoopSolPrice,
				  })
				: null}
			<ScrollingTicker
				recentPurchases={recentPurchases}
				topHolders={topHolders}
				totalSupply={totalSupply}
				solPrice={solPrice}
			/>
		</div>
	);
};

export default Layout;
