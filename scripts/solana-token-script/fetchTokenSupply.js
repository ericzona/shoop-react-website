// Import Solana web3.js library
const { Connection, PublicKey } = require('@solana/web3.js');

// Replace this with the Alchemy endpoint URL you received
const alchemyUrl = 'https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX';

// Create a connection to the Alchemy Solana node
const connection = new Connection(alchemyUrl);

// Replace this with the public key of your token's mint address
const tokenMintAddress = '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'; // Replace with your actual token mint address
const tokenMint = new PublicKey(tokenMintAddress);

// Fetch the token supply
async function fetchTokenSupply() {
  try {
    // Fetch the token supply information
    const tokenSupplyInfo = await connection.getTokenSupply(tokenMint);

    // Extract the total supply and adjusted supply
    const supply = tokenSupplyInfo.value.amount;
    const uiSupply = tokenSupplyInfo.value.uiAmount;

    console.log(`Total Supply: ${supply}`);
    console.log(`Total Supply (Adjusted for Decimals): ${uiSupply}`);
  } catch (error) {
    console.error('Error fetching token supply:', error);
  }
}

// Call the function
fetchTokenSupply();
