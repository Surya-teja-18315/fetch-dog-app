// pages/LoginPage.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dog from '../assets/dog.jpeg';

function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name,
        email,
      }, { withCredentials: true });
      navigate('/search');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-50">
      <img 
        src={dog}
        alt="Dogs Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative p-8 bg-white rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome to Fetch</h2>
        <p className="text-center mb-6 text-gray-700">Find your perfect companion and give them a forever home!</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
