import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const ScrollingTicker = () => {
	const [recentPurchases, setRecentPurchases] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

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

	const fetchRecentPurchases = useCallback(async () => {
		try {
			setLoading(true);
			const confirmedSignatures =
				await connection.getConfirmedSignaturesForAddress2(
					tokenMintAddress,
					{ limit: 10 }
				);

			const filteredPurchases = [];
			for (let signature of confirmedSignatures) {
				const transaction = await connection.getParsedTransaction(
					signature.signature,
					{
						maxSupportedTransactionVersion: 0, // Ensuring backward compatibility with version 0
					}
				);

				if (transaction) {
					const solAmount = transaction.meta.postBalances[0] / 1e9; // Convert lamports to SOL
					if (solAmount > 0.05) {
						filteredPurchases.push({
							signature: signature.signature,
							amount: solAmount,
						});
					}
				}
			}
			setRecentPurchases(filteredPurchases);
		} catch (error) {
			console.error('Error fetching recent purchases:', error);
			setError(
				'Unable to fetch recent purchases. Please try again later.'
			);
		} finally {
			setLoading(false);
		}
	}, [connection, tokenMintAddress]);

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchRecentPurchases();
		}, 2000); // Throttling for 2 seconds between requests

		return () => clearTimeout(timer); // Cleanup timeout
	}, [fetchRecentPurchases]);

	return (
		<div className='scrolling-ticker'>
			<h2>Recent Purchases</h2>
			{loading ? (
				<p>Loading purchases...</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<ul>
					{recentPurchases.map((purchase, index) => (
						<li key={index}>
							Transaction:{' '}
							<span>{`${purchase.signature.slice(
								0,
								5
							)}...${purchase.signature.slice(-5)}`}</span>{' '}
							- Amount: {purchase.amount.toFixed(2)} SOL
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ScrollingTicker;
