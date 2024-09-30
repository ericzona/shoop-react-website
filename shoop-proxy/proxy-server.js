// proxy-server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Alchemy Solana RPC URL 
const ALCHEMY_RPC_URL = 'https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX';

app.use(cors());
app.use(express.json());

// Fetch Top Holders
app.get('/api/holders', async (req, res) => {
  try {
    const response = await axios.post(ALCHEMY_RPC_URL, {
      method: 'alchemy_getProgramAccounts',
      params: [
        '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump', // address of $SHOOP
        {
          encoding: 'base64',
          withContext: true,
          order: 'desc'
        }
      ],
      jsonrpc: '2.0',
      id: 1
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching holders:', error);
    res.status(500).json({ message: 'Error fetching top holders' });
  }
});

// Fetch Token Supply
app.get('/api/token-supply', async (req, res) => {
  try {
    const response = await axios.post(ALCHEMY_RPC_URL, {
      method: 'getTokenSupply',
      params: ['3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'], // address of $SHOOP
      jsonrpc: '2.0',
      id: 1
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Error fetching token supply:', error);
    res.status(500).json({ message: 'Error fetching token supply' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
