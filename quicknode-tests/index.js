const web3 = require("@solana/web3.js");
const axios = require("axios");

// Connect to the QuickNode Solana Mainnet URL
(async () => {
  const solana = new web3.Connection(
    "https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31/"
  );
  
  // Fetch the current slot number
  try {
    const currentSlot = await solana.getSlot();
    console.log("Current Slot:", currentSlot);
  } catch (error) {
    console.error("Error fetching the current slot:", error);
  }
})();



(async () => {
  // QuickNode Solana Mainnet URL
  const quickNodeUrl = "https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31/";

  // Set up the request payload
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "getAssetsByAuthority",
    params: {
      authorityAddress: "mdaoxg4DVGptU4WSpzGyVpK3zqsgn7Qzx5XNgWTcEA2",
      limit: 10,
      page: 1,
    },
  };

  // Send the request to QuickNode
  try {
    const response = await axios.post(quickNodeUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Output the response
    console.log("Assets By Authority:", response.data);
  } catch (error) {
    console.error("Error fetching assets by authority:", error);
  }
})();
