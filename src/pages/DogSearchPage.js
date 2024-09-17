// src/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';

const DogSearchPage = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchBreeds();
    fetchDogs();
  }, [selectedBreed, page, sortOrder]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
      setBreeds(response.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchDogs = async () => {
    const queryParams = new URLSearchParams({
      breeds: selectedBreed ? [selectedBreed] : [],
      size: 10,
      from: (page - 1) * 10,
      sort: `breed:${sortOrder}`,
    });

    try {
      const response = await axios.get(`https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`, { withCredentials: true });
      const dogIds = response.data.resultIds;

      const dogsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
      setDogs(dogsResponse.data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
    setPage(1);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Search Dogs</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <label className="font-medium">Filter by Breed:</label>
            <select
              value={selectedBreed}
              onChange={handleBreedChange}
              className="p-2 border rounded-md focus:ring focus:ring-indigo-300"
            >
              <option value="">All Breeds</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSortChange}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Sort by Breed ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dogs.map((dog) => (
            <div key={dog.id} className="p-4 bg-white shadow-md rounded-md">
              <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-bold mt-4">{dog.name}</h3>
              <p className="text-gray-600">Breed: {dog.breed}</p>
              <p className="text-gray-600">Age: {dog.age}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DogSearchPage;
