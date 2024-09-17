import React from 'react';
import { Link } from 'react-router-dom';
import fetch from '../assets/fetch.png';

const NavBar = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold">
          <img src={fetch} alt="Fetch Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/about" className="hover:text-yellow-300">About Us</Link>
          <Link to="/services" className="hover:text-yellow-300">Services</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>

        {/* Login Button */}
        <div>
          <Link to="/login" className="bg-yellow-400 text-indigo-700 px-4 py-2 rounded-full hover:bg-yellow-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
