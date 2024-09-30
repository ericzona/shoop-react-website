import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center font-arcade">
      {/* Link the 'Shoop Shop Duster' text to the DApp page */}
      <Link to="/dapp" className="text-neonRed hover:text-neonYellow">
        The $SHOOP Shop
      </Link>
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
