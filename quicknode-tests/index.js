const web3 = require('@solana/web3.js');


// QuickNode Solana Mainnet URL
const QUICKNODE_URL = "https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31/";
const solanaConnection = new web3.Connection(QUICKNODE_URL);

// $SHOOP Token Mint Address
const TOKEN_MINT_ADDRESS = '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump';

// Fetch recent transactions for the token mint
const fetchRecentTransactions = async () => {
  try {
    const pubKey = new web3.PublicKey(TOKEN_MINT_ADDRESS);

    // Get the last 1000 transactions associated with this token
    const signatures = await solanaConnection.getSignaturesForAddress(pubKey, { limit: 1000 });

    // Extract transaction signatures
    const signatureList = signatures.map((tx) => tx.signature);
    const transactionDetails = await solanaConnection.getParsedTransactions(signatureList, {
      maxSupportedTransactionVersion: 0,
    });

    let validPurchases = [];
    // Process the transactions
    transactionDetails.forEach((tx, i) => {
      const instructions = tx.transaction.message.instructions;
      const meta = tx.meta;

      // We only care about purchases with amounts > 0.05 SOL
      if (meta.preTokenBalances && meta.postTokenBalances && instructions.length > 0) {
        const solSpent = meta.fee / 1e9; // SOL spent (convert lamports to SOL)

        if (solSpent >= 0.05) {
          validPurchases.push({
            wallet: instructions[0].parsed?.info?.owner || 'Unknown Wallet',
            amount: solSpent,
          });
        }
      }
    });

    return validPurchases;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

// Run and display the valid purchases
(async () => {
  const purchases = await fetchRecentTransactions();
  console.log('Valid $SHOOP Purchases:', purchases);
})();
