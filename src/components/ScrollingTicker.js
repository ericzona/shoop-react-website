import React from 'react';
import './ScrollingTicker.css';

const ScrollingTicker = ({ recentTransactions = [], solPrice }) => {
  return (
    <div className="ticker-container">
      {/* Update the title to 'Recent TXs' with a glowing effect */}
      <h2 className="ticker-title">Recent TXs</h2> 
      <div className="ticker">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction, index) => {
            const { walletShort, amount, usdValue, type } = transaction;

            // Apply class based on transaction type (buy or sell)
            const walletClass = type === 'buy' ? 'wallet-address buy' : 'wallet-address sell';

            return (
              <span key={index} className="ticker-item">
                <span className={walletClass}>
                  {walletShort} {/* First 6 chars of wallet */}
                </span>{' '}
                <span>{type.toUpperCase()}</span>{' '}
                <span className="sol-amount">{amount} $SHOOP</span>{' '}
                <span className="usd-amount">
                  (${usdValue} USD)
                </span>
              </span>
            );
          })
        ) : (
          <p>No recent transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default ScrollingTicker;
