import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import the background image and logo from the assets folder
import backgroundImage from '../assets/12.jpeg';
import logo from '../assets/fetch.png'; // Placeholder for logo image, update the path accordingly

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name,
        email
      }, { withCredentials: true });
      navigate('/search');
    } catch (error) {
      alert('Login failed, please try again.');
    }
  };

  return (
    <div>
      {/* Nav Bar */}
      <nav className="bg-[#D1C4A9] shadow-md py-4">
        <div className="container mx-auto flex justify-center items-center">
          {/* Logo and title in the middle */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-12 mr-2" /> {/* Replace with your logo */}
            <span className="text-xl font-bold text-gray-800">DogAdopt</span>
          </div>
        </div>
      </nav>

      {/* Main Content: Login Section */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-6xl p-8 bg-opacity-80 bg-white rounded-lg shadow-md">
          
          {/* Message Section */}
          <div className="md:w-1/2 p-6 text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-[#5A503B]">Welcome to Dog Adoption Platform</h2>
            <p className="text-lg mb-6 text-[#5A503B]">
              Our mission is to help homeless dogs find their forever homes. 
              Join us in making a difference by creating your account or logging in to explore available dogs. 
              Browse through various breeds, learn about the dogs' backgrounds, and find your perfect furry companion.
            </p>
            <p className="text-lg text-[#5A503B]">
              Every dog deserves a loving home, and with your help, we can make that happen.
              Let’s bring happiness to these dogs by giving them the life they deserve.
            </p>
          </div>

          {/* Login Box */}
          <div className="bg-[#D1C4A9] text-gray-900 p-8 rounded-lg shadow-md w-full max-w-md md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-2 border rounded" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-500 text-white w-full p-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#D1C4A9] text-center py-4 shadow-md">
        <div className="container mx-auto">
          <p className="text-gray-700">© 2024 DogAdopt. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
