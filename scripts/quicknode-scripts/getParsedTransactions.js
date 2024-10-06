const solanaWeb3 = require('@solana/web3.js');

const QUICKNODE_URL = 'https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31';
const connection = new solanaWeb3.Connection(QUICKNODE_URL, 'confirmed');

// The SHOOP Token Mint Address
const tokenMintAddress = new solanaWeb3.PublicKey('3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump');

// Retry logic with reduced retries
const retry = async (fn, retries = 2) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`Retrying... Attempts left: ${retries}`);
    return retry(fn, retries - 1);
  }
};

// Function to fetch and process transactions
const getTransactions = async (address, numTx, before = null) => {
  try {
    const pubKey = new solanaWeb3.PublicKey(address);

    // Fetch the transaction signatures with an increased limit (50)
    let transactionList = await retry(() =>
      connection.getSignaturesForAddress(pubKey, { limit: numTx, before }) 
    );

    // Get the signatures for detailed parsing
    let signatureList = transactionList.map(transaction => transaction.signature);

    // Fetch detailed transaction information in parallel using Promise.all
    let transactionDetails = await retry(() =>
      Promise.all(signatureList.map(signature =>
        connection.getParsedTransaction(signature, { maxSupportedTransactionVersion: 0 })
      ))
    );

    // Process each transaction detail
    transactionDetails.forEach((transaction, index) => {
      if (transaction && transaction.meta) {
        const preTokenBalances = transaction.meta.preTokenBalances || [];
        const postTokenBalances = transaction.meta.postTokenBalances || [];

        // Filter out null or same amount transactions
        preTokenBalances.forEach((balance, i) => {
          const preAmount = balance.uiTokenAmount.uiAmount;
          const postAmount = postTokenBalances[i]?.uiTokenAmount.uiAmount || 0;

          // Skip transactions where preAmount === postAmount
          if (preAmount === postAmount || preAmount === null || postAmount === null) {
            return; // Skip this transaction
          }

          console.log(`Transaction No: ${index + 1}`);
          console.log(`Signature: ${transaction.transaction.signatures[0]}`);
          console.log(`Pre Amount: ${preAmount}, Post Amount: ${postAmount}`);

          const difference = postAmount - preAmount;

          if (difference > 0.05) {
            console.log(`Buy detected: ${difference} $SHOOP tokens`);
          } else if (difference < -0.05) {
            console.log(`Sell detected: ${-difference} $SHOOP tokens`);
          }

          console.log('-----------------------------');
        });
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

// Fetch and process the latest 50 transactions
getTransactions(tokenMintAddress, 50);
