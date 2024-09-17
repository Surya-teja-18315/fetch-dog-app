// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-6">
      <div className="container mx-auto text-center space-y-4">
        {/* Footer Links */}
        <div className="flex justify-center space-x-8">
          <a href="/" className="hover:text-yellow-400">Privacy Policy</a>
          <a href="/" className="hover:text-yellow-400">Terms of Service</a>
          <a href="/" className="hover:text-yellow-400">Contact Us</a>
        </div>

        {/* Social Media Icons (if Fetch has them) */}
        <div className="flex justify-center space-x-6">
          <a href="#" aria-label="Facebook" className="hover:text-yellow-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-yellow-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-yellow-400">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400">&copy; 2024 Fetch. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
