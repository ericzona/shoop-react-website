// src/wallet.js

export const getPhantomProvider = () => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };
  