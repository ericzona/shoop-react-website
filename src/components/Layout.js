// src/components/Layout.js
import React from 'react';
import Navbar from '../Navbar'; // Up two levels to where the Navbar.js is located
import ScrollingTicker from './ScrollingTicker'; // Import the Ticker

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}  {/* Renders main page content */}
      <ScrollingTicker />  {/* Scrolling Ticker added at the bottom */}
    </div>
  );
};

export default Layout;
