import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center font-arcade">
      <h1 className="text-neonRed">Shoop Shop Duster</h1>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-neonYellow">Home</Link></li>
        <li><Link to="/about" className="hover:text-neonFuschia">About</Link></li>
        <li><Link to="/dapp" className="hover:text-neonYellow">DApp</Link></li>
        <li><Link to="/faq" className="hover:text-neonFuschia">FAQ</Link></li>
        <li><Link to="/contact" className="hover:text-neonYellow">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
