import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getPhantomProvider } from '../wallet';
import { TOKEN_PROGRAM_ID, getAccount } from '@solana/spl-token';

const DApp = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const connectWallet = async () => {
    const provider = getPhantomProvider();
    if (provider) {
      try {
        const response = await provider.connect();
        setWalletAddress(response.publicKey.toString());
        setErrorMessage('');
        fetchBalance(response.publicKey);
        await scanForDustTokens(response.publicKey); // Ensure this function is called here
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
      const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX');
      const balance = await connection.getBalance(new PublicKey(publicKey));
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setErrorMessage('Error fetching balance.');
    }
  };

  const scanForDustTokens = async (publicKey) => {
    try {
      const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX');
      const accounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      const dustTokens = [];
      for (const account of accounts.value) {
        const accountInfo = await getAccount(connection, account.pubkey);
        const amount = accountInfo.amount / LAMPORTS_PER_SOL; // Adjust for token decimals if necessary

        // Example threshold: Tokens with less than 0.01 value considered "dust"
        if (amount < 0.01) {
          dustTokens.push({
            mint: accountInfo.mint.toString(),
            balance: amount,
          });
        }
      }

      setTokens(dustTokens);
    } catch (err) {
      console.error('Error scanning tokens:', err);
      setErrorMessage('Error scanning for tokens.');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(0);
    setTokens([]);
  };

  return (
    <div className="text-center font-prometo">
      {/* Social Icons */}
      <div className="flex justify-end space-x-4 p-4">
        <a href="https://t.me/ShoopDaWhoopSol" target="_blank" rel="noopener noreferrer">
          <img src="/icons/telegram-icon.png" alt="Telegram" className="w-8 h-8" />
        </a>
        <a href="https://x.com/shoop_da_whoop_" target="_blank" rel="noopener noreferrer">
          <img src="/icons/twitter-icon.png" alt="Twitter" className="w-8 h-8" />
        </a>
      </div>

      <h1 className="text-3xl text-neonRed mb-4 font-arcade">DApp Dashboard</h1>

      {/* $SHOOP Token Info */}
      <div className="mb-4">
        <a href="https://pump.fun/3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump" target="_blank" rel="noopener noreferrer" className="text-neonYellow underline">
          Buy $SHOOP Tokens
        </a>
        <p className="text-white">Contract Address: <span className="text-neonFuschia">3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump</span></p>
      </div>

      {!walletAddress ? (
        <>
          <button
            className="bg-neonRed text-black px-4 py-2 rounded hover:bg-neonYellow transition duration-200 ease-in-out font-prometo"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </>
      ) : (
        <div className="mt-4">
          {/* Adjusted wallet and balance styling */}
          <p className="text-white mb-2">Connected to: {walletAddress}</p>
          <p className="text-white">
            Balance: <span className="text-neonGreenBlue">{balance} SOL</span>
          </p>

          {/* Centered Connected Icon and Disconnect Button */}
          <div className="flex justify-center items-center space-x-2 mt-2">
            <span className="text-neonGreenBlue font-bold">● Connected</span>
            <button
              className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-500 transition duration-200"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>

          {/* Dust Tokens Section */}
          <div className="mt-4">
            <h2 className="text-2xl text-neonYellow">Dust Tokens:</h2>
            {tokens.length > 0 ? (
              tokens.map((token, index) => (
                <div key={index} className="text-neonFuschia">
                  <p>Token: {token.mint}</p>
                  <p>Balance: {token.balance}</p>
                  <button className="bg-neonRed text-black px-2 py-1 rounded mt-2">Swap for SOL</button>
                </div>
              ))
            ) : (
              <p className="text-white">No dust tokens found.</p>
            )}
          </div>
        </div>
      )}

      {/* Bottom Call-to-Action */}
      <div className="mt-8 p-4 bg-black text-center">
        <p className="text-neonYellow">Please Vote to boost the SHOOP Community!</p>
        <a href="https://t.me/MajorTrending/2187978/2188359" target="_blank" rel="noopener noreferrer" className="text-neonFuschia underline">
          powered by @MajorTrending 🎩 Community Trending
        </a>
      </div>
    </div>
  );
};

export default DApp;
