import React from 'react';
import './ScrollingTicker.css';

const ScrollingTicker = ({ recentPurchases = [], solPrice }) => {
  return (
    <div className="ticker-container">
      <h2>Recent Purchases</h2>
      <div className="ticker">
        {recentPurchases.length > 0 ? (
          recentPurchases.map((purchase, index) => {
            const walletShort = `${purchase.wallet.slice(0, 6)}`; // First 6 characters of wallet
            const solSpent = purchase.amount.toFixed(2); // SOL spent
            const usdValue = (purchase.amount * solPrice).toFixed(2); // USD equivalent
            
            return (
              <span key={index} className="ticker-item">
                <span className="wallet-address" style={{ color: '#E1B87F' }}>
                  {walletShort} {/* First 6 chars */}
                </span>{' '}
                <strong>BUY</strong>{' '}
                <span className="sol-amount">{solSpent} SOL</span>{' '}
                <span className="usd-amount" style={{ color: 'green' }}>
                  (${usdValue} USD)
                </span>
              </span>
            );
          })
        ) : (
          <p>No recent purchases found.</p>
        )}
      </div>
    </div>
  );
};

export default ScrollingTicker;
