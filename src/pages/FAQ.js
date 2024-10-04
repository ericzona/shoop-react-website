import React from 'react';

const FAQ = ({
	topHolders = [],
	solPrice = 0,
	shoopSolPrice = 0,
	totalSupply = 999791351.27,
}) => {
	// Helper function for rank-based gradient color
	const getColorByRank = (rank) => {
		const colors = [
			'#00FF00',
			'#33FF00',
			'#66FF00',
			'#99FF00',
			'#CCFF00',
			'#FFFF00',
			'#FFCC00',
			'#FF9900',
			'#FF6600',
			'#FF3300',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#CC00FF',
			'#9900FF',
			'#6600FF',
			'#3300FF',
		]; // 20 colors gradient
		return colors[Math.min(rank, colors.length - 1)];
	};

	return (
		<div className='p-8 font-prometo text-white'>
			<p style={{ color: 'blue' }}>This is FAQ.js component</p>{' '}
			{/* Dummy text */}
			{/* Frequently Asked Questions */}
			<div className='mb-8'>
				<h1 className='text-3xl text-neonRed mb-4 font-arcade'>
					Frequently Asked Questions
				</h1>
				<ul className='list-disc list-inside space-y-2'>
					<li>
						<strong>Q:</strong> What is $SHOOP?
						<br />
						<strong>A:</strong> $SHOOP is a token that lets you reclaim and
						convert your unwanted tokens.
					</li>
					<li>
						<strong>Q:</strong> How do I connect my wallet?
						<br />
						<strong>A:</strong> Use the DApp page to connect your Phantom,
						Solflare, or WalletConnect wallet.
					</li>
				</ul>
			</div>
			{/* Top Holders Section */}
			<div className='p-4 bg-black border-2 border-neonRed rounded-lg shadow-md'>
				<h2 className='text-2xl text-neonYellow mb-4'>
					Top $SHOOP Holders
				</h2>
				{topHolders.length > 0 ? (
					<ul className='list-none space-y-3'>
						{topHolders.map((holder, index) => (
							<li
								key={index}
								className='p-2 border border-neonFuschia rounded bg-gray-800'>
								<p>
									<strong>Rank:</strong> {index + 1}
								</p>
								<p>
									<strong>Wallet: </strong>
									<span style={{ color: '#E1B87F' }}>
										{`${holder.address.slice(
											0,
											6
										)}...${holder.address.slice(-6)}`}{' '}
										{/* First 6 and Last 6 */}
									</span>
								</p>
								<p>
									<strong>$SHOOP Balance: </strong>
									<span style={{ color: getColorByRank(index) }}>
										{holder.amount.toLocaleString()} tokens
									</span>
								</p>
								<p>
									<strong>% of Total $SHOOP Supply Held: </strong>
									<span style={{ color: getColorByRank(index) }}>
										{((holder.amount / totalSupply) * 100).toFixed(2)}%
									</span>
								</p>
								<p>
									<strong>Current SOL Value: </strong>
									<span>
										{(holder.amount * shoopSolPrice).toFixed(4)} SOL
									</span>
								</p>
							</li>
						))}
					</ul>
				) : (
					<p>No holders found.</p>
				)}
			</div>
			{/* Total Supply Display */}
			<div className='mt-6'>
				<h3 className='text-lg text-neonGreen'>
					Total Supply: {totalSupply.toLocaleString()} $SHOOP Tokens
				</h3>
				<p>Current SOL Price (USD): ${solPrice.toFixed(2)}</p>
				<p>
					Current $SHOOP Price (in SOL): {shoopSolPrice.toFixed(6)} SOL
				</p>
			</div>
		</div>
	);
};

export default FAQ;
