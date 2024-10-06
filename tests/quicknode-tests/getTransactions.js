const solanaWeb3 = require('@solana/web3.js');

const QUICKNODE_URL = 'https://solemn-billowing-vineyard.solana-mainnet.quiknode.pro/8e209577e97d88a4823043e4d3fb58b102a9eb31/';

const connection = new solanaWeb3.Connection(QUICKNODE_URL, 'confirmed', {commitment: 'finalized', timeout: 10000}); // 10 seconds timeout


const searchAddress = '3skaj7TycpF1tgw6D59eYxiay625LisM9993jrgmpump'; // $SHOOP Token Address

// const MIN_SOL_THRESHOLD = 0.05; // Minimum transaction value to filter

// const getTransactions = async (address, numTx) => {
//   const pubKey = new solanaWeb3.PublicKey(address);

//   // Get signatures for the address
//   let transactionList = await connection.getSignaturesForAddress(pubKey, { limit: numTx });
//   console.log("Transaction list fetched:", transactionList.length); // Log number of transactions fetched
  
const getTransactions = async (address, numTx) => {
    const pubKey = new solanaWeb3.PublicKey(address);
    let transactionList = await connection.getSignaturesForAddress(pubKey, { limit: numTx });
    console.log(transactionList);
  };
  
  getTransactions(searchAddress, 10);
  

//   // Extract the signatures
//   let signatureList = transactionList.map((transaction) => transaction.signature);

//   // Get detailed transaction information
//   let transactionDetails = await connection.getParsedTransactions(signatureList, { maxSupportedTransactionVersion: 0 });

//   // Filter transactions above the SOL threshold
//   let filteredTransactions = transactionDetails.filter((tx) => {
//     const meta = tx.meta;
//     if (!meta || !meta.preBalances || !meta.postBalances) return false;

//     // Calculate the SOL spent
//     const solSpent = (meta.preBalances[0] - meta.postBalances[0]) / solanaWeb3.LAMPORTS_PER_SOL;

//     return solSpent > MIN_SOL_THRESHOLD;
//   });

//   // Process filtered transactions to identify Buy/Sell and log the details
//   filteredTransactions.forEach((tx, i) => {
//     const meta = tx.meta;
//     const solSpent = (meta.preBalances[0] - meta.postBalances[0]) / solanaWeb3.LAMPORTS_PER_SOL;

//     // Attempt to determine if it's a buy or sell based on the program used in instructions
//     const instructions = tx.transaction.message.instructions;

//     let action = 'Unknown'; // Default value
//     instructions.forEach((instruction) => {
//       if (instruction.programId.toString() === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') {
//         action = 'Buy';
//       } else if (instruction.programId.toString() === '11111111111111111111111111111111') {
//         action = 'Sell';
//       }
//     });

//     console.log(`Transaction No: ${i + 1}`);
//     console.log(`Action: ${action}`);
//     console.log(`SOL Spent: ${solSpent.toFixed(2)} SOL`);
//     console.log(`Signature: ${tx.transaction.signatures[0]}`);
//     console.log(`-----------------------------`);
//   });
// };

// // Run the script to fetch and process the transactions
// getTransactions(searchAddress, 50);
