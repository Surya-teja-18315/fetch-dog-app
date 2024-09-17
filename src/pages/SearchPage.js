// pages/SearchPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DogCard from '../components/DogCard';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar'; // Import the updated SortBar component
import Pagination from '../components/Pagination';

function SearchPage() {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [filters, setFilters] = useState({
    breeds: [],
    city: '',
    state: '',
    zipCodes: [],
    ageMin: 0,
    ageMax: 15,
    geoBoundingBox: null,
  });
  const [sortField, setSortField] = useState('breed'); // Default to sorting by breed
  const [sortOrder, setSortOrder] = useState('asc'); // Default to alphabetical A-Z
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching breeds', error);
      }
    };

    fetchBreeds();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/locations/search', {
        city: filters.city || undefined,
        states: filters.state ? [filters.state] : undefined,
        geoBoundingBox: filters.geoBoundingBox || undefined,
        size: 100, // Adjust size as needed
      }, { withCredentials: true });

      setLocations(response.data.results);

      // Extract unique states from the location data
      const uniqueStates = Array.from(new Set(response.data.results.map(location => location.state)));
      setStates(uniqueStates);

      // Extract unique zip codes from the location data for dog search
      const zipCodes = response.data.results.map(location => location.zip_code);
      setFilters((prevFilters) => ({ ...prevFilters, zipCodes }));
      
    } catch (error) {
      console.error('Error fetching locations', error);
    }
  };

  const fetchDogs = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params: {
          breeds: filters.breeds.length ? filters.breeds : undefined,
          zipCodes: filters.zipCodes.length ? filters.zipCodes : undefined,
          ageMin: filters.ageMin,
          ageMax: filters.ageMax,
          sort: `${sortField}:${sortOrder}`, // Combine field and order for sorting
          size: 10,
          from: page * 10,
        },
        withCredentials: true,
      });
      setDogs(response.data.resultIds);
    } catch (error) {
      console.error('Error fetching dogs', error);
    }
  };

  const handleFavorite = (dogId) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(dogId) ? prevFavorites.filter(id => id !== dogId) : [...prevFavorites, dogId]
    );
  };

  const handleApplyFilters = () => {
    fetchLocations();
    fetchDogs();
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <img 
        src="https://your-image-url.com/park-background.jpg" 
        alt="Park Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Find Your Perfect Dog</h1>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
          <FilterBar
            breeds={breeds}
            locations={locations}
            states={states}
            filters={filters}
            setFilters={setFilters}
          />
          <SortBar 
            sortField={sortField} 
            setSortField={setSortField} 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder} 
          />
          <button
            onClick={handleApplyFilters}
            className="w-full p-3 mt-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {dogs.map((dogId) => (
            <DogCard key={dogId} dogId={dogId} onFavorite={handleFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
