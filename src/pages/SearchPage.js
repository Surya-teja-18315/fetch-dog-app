import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DogList from '../components/DogList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);  // State for storing favorite dog IDs
  const [filters, setFilters] = useState({
    breed: [],
    zipCode: '',
    ageMin: '',
    ageMax: '',
    sortBy: 'breed',
    sortOrder: 'asc',
    city: '',
    state: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDogs, setTotalDogs] = useState(0);
  const [match, setMatch] = useState(null);  // State for storing the match result
  const navigate = useNavigate();

  const fetchDogs = async (page = 1) => {
    try {
      const params = {
        breeds: filters.breed.length ? filters.breed : undefined,
        zipCodes: filters.zipCode ? [filters.zipCode] : undefined,
        ageMin: filters.ageMin,
        ageMax: filters.ageMax,
        size: 25,  // Number of dogs per page
        from: (page - 1) * 25,
        sort: `${filters.sortBy}:${filters.sortOrder}`,
      };

      // If city or state filters are applied, get location-based zip codes
      if (filters.city || filters.state) {
        const locationParams = {};
        if (filters.city) locationParams.city = filters.city;
        if (filters.state) locationParams.states = [filters.state];

        const locationResponse = await axios.post('https://frontend-take-home-service.fetch.com/locations/search', locationParams, { withCredentials: true });
        const zipCodes = locationResponse.data.results.map(loc => loc.zip_code);
        params.zipCodes = zipCodes.length ? zipCodes : params.zipCodes;
      }

      // Fetch dogs based on the applied filters
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params,
        withCredentials: true,
      });

      const dogIds = response.data.resultIds;
      setTotalDogs(response.data.total);

      if (dogIds.length > 0) {
        const dogData = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, { withCredentials: true });
        setDogs(dogData.data);
      } else {
        setDogs([]);  // No dogs found for the current filter
      }
    } catch (error) {
      console.error('Error fetching dogs:', error.response ? error.response.data : error.message);
    }
  };

  const applyFilters = () => {
    setCurrentPage(1);  // Reset page to 1 when applying filters
    fetchDogs(1);
  };

  const handleLogout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Add or remove dogs from the favorites list
  const addToFavorites = (dogId) => {
    if (favorites.includes(dogId)) {
      setFavorites(favorites.filter(id => id !== dogId));  // Remove from favorites if already selected
    } else {
      setFavorites([...favorites, dogId]);  // Add to favorites
    }
  };

  // Generate a match based on the selected favorite dogs
  const generateMatch = async () => {
    try {
      // Get the matched dog ID
      const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, { withCredentials: true });
      const matchedDogId = response.data.match;  // Store the matched dog ID
      
      // Fetch full dog details using the matched dog ID
      const dogDetailsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [matchedDogId], { withCredentials: true });
      const matchedDogDetails = dogDetailsResponse.data[0];  // Get the first dog in the array (only one match)
  
      setMatch(matchedDogDetails);  // Set the full dog details in state
  
    } catch (error) {
      console.error('Error generating match:', error.response ? error.response.data : error.message);
    }
  };
  

  useEffect(() => {
    fetchDogs(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl">Fetch Dog App</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      <Filters filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
      
      {/* Display DogList with Add to Favorites functionality */}
      <div className="container mx-auto p-4">
      {/* Nav and Filters omitted for brevity */}
      <DogList 
        dogs={dogs} 
        addToFavorites={addToFavorites}  // Pass addToFavorites function
        favorites={favorites}  // Pass favorites array
      />
      {/* Pagination and footer */}
    </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalResults={totalDogs} 
        setCurrentPage={setCurrentPage} 
        pageSize={25} 
      />

      {/* Display favorite dogs and generate match button */}
      <div className="mt-4">
        <h2 className="text-lg font-bold">Favorite Dogs: {favorites.length}</h2>
        {favorites.length > 0 && (
          <button 
            onClick={generateMatch} 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Generate Match
          </button>
        )}
      </div>

      {/* Display the match result if available */}
      {match && (
  <div className="mt-6 bg-green-100 p-4 rounded text-center">
    <h3 className="text-lg font-bold">You’ve been matched with:</h3>
    <img src={match.img} alt={match.name} className="w-32 h-32 object-cover rounded-full mx-auto mt-4" />
    <h4 className="text-xl font-bold mt-2">{match.name}</h4>
    <p>Breed: {match.breed}</p>
    <p>Age: {match.age} years</p>
    <p>Location: {match.zip_code}</p>
  </div>
)}


      <footer className="mt-6 p-4 bg-gray-800 text-white text-center">
        <p>© 2024 Fetch Dog App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default SearchPage;
