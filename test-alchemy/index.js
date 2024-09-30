const axios = require("axios");

const fetchProgramAccounts = async () => {
  try {
    const response = await axios.post(
      "https://solana-mainnet.g.alchemy.com/v2/6Dl6RPAqjlzdCET166sYAfqPj5J0PDvX",
      {
        id: 1,
        jsonrpc: "2.0",
        method: "getProgramAccounts",
        params: [
          "3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump", // SHOOP token address
          {
            encoding: "base64", // Switch to base64 encoding
            withContext: true,
            commitment: "confirmed",
          },
        ],
      }
    );
    console.log("Program Accounts Data:", response.data);
  } catch (error) {
    console.error("Error fetching program accounts:", error.response ? error.response.data : error.message);
  }
};

fetchProgramAccounts();
