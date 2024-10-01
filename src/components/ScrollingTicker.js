// src/components/ScrollingTicker.js
import React from 'react';
import './ScrollingTicker.css';

const SOL_TO_USD = 25;

const ScrollingTicker = ({ recentPurchases = [] }) => {
  return (
    <div className="ticker-container">
      <h2>Recent Purchases</h2>
      <div className="ticker">
        {recentPurchases.length > 0 ? (
          recentPurchases.map((purchase, index) => (
            <span key={index} className="ticker-item">
              <span className="wallet-address">{`${purchase.wallet.slice(0, 5)}...${purchase.wallet.slice(-5)}`}</span>
              <strong> BUY </strong>
              <span className="sol-amount">{purchase.amount.toFixed(2)} SOL</span>
              <span className="usd-amount" style={{ color: 'green' }}> (${(purchase.amount * SOL_TO_USD).toFixed(2)} USD)</span>
            </span>
          ))
        ) : (
          <p>No recent purchases found.</p>
        )}
      </div>
    </div>
  );
};


export default ScrollingTicker;
