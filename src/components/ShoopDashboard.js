// src/components/ShoopDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Replace with the actual SHOOP contract address
const SHOOP_CONTRACT_ADDRESS = '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump';

const ShoopDashboard = () => {
  const [holders, setHolders] = useState([]);
  const [marketCap, setMarketCap] = useState(0);
  const [buyOrders, setBuyOrders] = useState([]);

  useEffect(() => {
    // Fetch top 10 holders
    const fetchTopHolders = async () => {
      try {
        const response = await axios.get(
          `https://api.solscan.io/token/holders?tokenAddress=${SHOOP_CONTRACT_ADDRESS}&offset=0&limit=10`
        );
        setHolders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching top holders:', error);
      }
    };

    // Fetch market cap
    const fetchMarketCap = async () => {
      try {
        const response = await axios.get(
          `https://api.solscan.io/token/meta?tokenAddress=${SHOOP_CONTRACT_ADDRESS}`
        );
        setMarketCap(response.data.data.market_cap || 0);
      } catch (error) {
        console.error('Error fetching market cap:', error);
      }
    };

    // Fetch recent buy orders
    const fetchBuyOrders = async () => {
      try {
        const response = await axios.get(
          `https://api.solscan.io/market/trades?symbol=SHOOP&limit=100`
        );
        setBuyOrders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching buy orders:', error);
      }
    };

    // Fetch data every hour
    fetchTopHolders();
    fetchMarketCap();
    fetchBuyOrders();
    const interval = setInterval(() => {
      fetchTopHolders();
      fetchMarketCap();
      fetchBuyOrders();
    }, 3600000); // 1 hour interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="dashboard">
      {/* Display Top 10 Holders */}
      <div className="top-holders grid grid-cols-5 gap-4 p-4">
        {holders.map((holder, index) => (
          <div key={index} className="holder bg-gray-800 p-2 rounded text-white">
            <p className="font-bold">{holder.address}</p>
            <p>Balance: {holder.amount}</p>
          </div>
        ))}
      </div>

      {/* Display Market Cap */}
      <div className="market-cap text-right p-4 text-neonYellow">
        <p>Market Cap: ${marketCap.toLocaleString()}</p>
      </div>

      {/* Scrolling Ticker for Buy Orders */}
      <div className="buy-ticker bg-black text-white py-2 fixed bottom-0 w-full overflow-x-auto">
        {buyOrders.map((order, index) => (
          <span key={index} className="ticker-item px-4">
            Buy Order: {order.amount} SHOOP at {order.price} SOL
          </span>
        ))}
      </div>

      {/* Profit/Loss Tracking App (Placeholder) */}
      <div className="profit-loss-tracking">
        <button className="bg-neonRed text-white px-4 py-2 rounded mt-4">
          Track Profit/Loss
        </button>
      </div>
    </div>
  );
};

export default ShoopDashboard;
