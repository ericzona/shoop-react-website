import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getPhantomProvider } from '../wallet'; 

const DApp = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    const provider = getPhantomProvider();
    if (provider) {
      try {
        const response = await provider.connect();
        setWalletAddress(response.publicKey.toString());
        setErrorMessage('');
        fetchBalance(response.publicKey);
      } catch (err) {
        console.error('Wallet connection error:', err);
        setErrorMessage('Failed to connect to wallet. Please try again.');
      }
    } else {
      setErrorMessage('Phantom wallet not found. Please install it from https://phantom.app');
    }
  };

  const fetchBalance = async (publicKey) => {
    try {
      // Replace with your Alchemy Solana RPC URL
      const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX');
      const balance = await connection.getBalance(new PublicKey(publicKey));
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setErrorMessage('Error fetching balance.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-arcade text-neonRed mb-4">DApp Dashboard</h1>
      {!walletAddress ? (
        <>
          <button
            className="bg-neonRed text-black px-4 py-2 rounded hover:bg-neonYellow font-prometo"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </>
      ) : (
        <div>
          <p className="text-neonFuschia mt-2">Connected to: {walletAddress}</p>
          <p className="text-neonYellow mt-2">Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
};

export default DApp;
