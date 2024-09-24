import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-arcade text-neonRed">Welcome to $SHOOP Shop Duster!</h1>
      <p className="text-lg mt-4 text-white">Your one-stop solution for converting and reclaiming tokens.</p>
      
      {/* Add a GIF linking to the DApp */}
      <div className="mt-8">
        <Link to="/dapp">
          <img 
            src="/images/gifs/Shoop_man_main.gif" 
            alt="Shoop Action" 
            className="mx-auto rounded-lg shadow-lg hover:opacity-90 transition duration-200 ease-in-out"
          />
        </Link>
      </div>
      
      {/* Button below the GIF linking to the DApp */}
      <div className="mt-4">
        <Link to="/dapp">
          <button className="bg-neonYellow text-black px-6 py-2 rounded-lg font-arcade hover:bg-neonRed transition duration-200 ease-in-out">
            Go to DApp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
