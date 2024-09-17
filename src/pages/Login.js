// src/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dogImages, setDogImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search?size=5');
        const dogIds = response.data.resultIds;

        const dogsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });

        console.log('Dogs Response:', dogsResponse.data);
        
        setDogImages(dogsResponse.data);
      } catch (error) {
        console.error('Error fetching dog images', error);
      }
    };
    fetchDogImages();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name,
        email
      }, { withCredentials: true });

      if (response.status === 200) {
        navigate('/search');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-blue-100">
      <NavBar />
      <div className="container mx-auto flex justify-center items-center mt-10 space-x-10">
        {/* Left Content - Login Form */}
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6 text-indigo-700">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Content - Message */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">Finding friends for a lifetime!</h2>
          <p className="text-lg text-gray-700 mb-6">Discover loyal companions and the joy of adding a new furry friend to your life.</p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Meet Some Amazing Dogs</h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="flex overflow-x-scroll space-x-6 scrollbar-hide">
            {dogImages.map((dog, index) => (
              <div key={index} className="min-w-[250px] h-[300px] bg-white shadow-lg rounded-lg">
                <img src={dog.img} alt={dog.name} className="w-full h-full object-cover rounded-lg" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{dog.name}</h3>
                  <p className="text-gray-600">Breed: {dog.breed}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full">
            Prev
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full">
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
