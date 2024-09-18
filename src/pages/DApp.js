import React, { useState } from 'react';
import { getPhantomProvider } from '../wallet';  // Make sure wallet.js is correctly imported

const DApp = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    const provider = getPhantomProvider();
    if (provider) {
      try {
        const response = await provider.connect();  // Connect to Phantom wallet
        setWalletAddress(response.publicKey.toString());  // Set the wallet address
        setErrorMessage('');  // Clear any error messages
      } catch (err) {
        console.error('Wallet connection error:', err);
        setErrorMessage('Failed to connect to wallet. Please try again.');
      }
    } else {
      setErrorMessage('Phantom wallet not found. Please install it from https://phantom.app');
    }
  };

  return (
    <div>
      <h1>DApp Dashboard</h1>
      {!walletAddress ? (
        <>
          <button onClick={connectWallet}>Connect Wallet</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      ) : (
        <p>Connected to: {walletAddress}</p>
      )}
    </div>
  );
};

export default DApp;
