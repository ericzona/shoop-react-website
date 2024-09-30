// src/solanaUtils.js
import { Connection, PublicKey } from '@solana/web3.js';

// Setup Solana connection
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Define the token mint address
const tokenMintAddress = '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'; // Your actual token mint address
const tokenMint = new PublicKey(tokenMintAddress);

// Fetch token supply information
export const fetchTokenSupply = async () => {
  try {
    const tokenSupplyInfo = await connection.getTokenSupply(tokenMint);
    return tokenSupplyInfo.value;
  } catch (error) {
    console.error('Error fetching token supply:', error);
    return null;
  }
};

// Fetch top holders data (replace with your actual implementation)
export const fetchTopHolders = async () => {
  try {
    // Implement logic to fetch top holders; this is an example placeholder
    const holders = [
      { owner: '3ABc...', amount: 1000, amountPercent: 1.5, uiAmount: 100 },
      { owner: '4DDe...', amount: 2000, amountPercent: 2.5, uiAmount: 200 },
      { owner: '5FFr...', amount: 500, amountPercent: 0.75, uiAmount: 50 },
    ];
    return holders;
  } catch (error) {
    console.error('Error fetching top holders:', error);
    return [];
  }
};
