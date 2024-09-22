import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filters = ({ filters, setFilters, applyFilters }) => {
  const [breeds, setBreeds] = useState([]);
  const [cities, setCities] = useState([]);

  // List of US states in two-letter format
  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // Fetch available breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true });
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching breeds:', error.response ? error.response.data : error.message);
      }
    };

    fetchBreeds();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (filters.state) {
      const fetchCities = async () => {
        try {
          const response = await axios.post('https://frontend-take-home-service.fetch.com/locations/search', 
          { states: [filters.state], size: 100 }, 
          { withCredentials: true });
          
          const cityList = response.data.results.map(location => location.city);
          setCities([...new Set(cityList)]);  // Ensure unique cities
        } catch (error) {
          console.error('Error fetching cities:', error.response ? error.response.data : error.message);
        }
      };

      fetchCities();
    }
  }, [filters.state]);

  return (
    <div className="p-4 bg-[#efeadd] rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Multi-select for Breeds */}
        <div>
          <label className="block text-gray-700">Breeds (Multi-select)</label>
          <select 
            multiple 
            value={filters.breed} 
            onChange={(e) => setFilters({ ...filters, breed: Array.from(e.target.selectedOptions, option => option.value) })} 
            className="w-full p-2 border rounded"
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-gray-700">Age Range (Min)</label>
          <input 
            type="number" 
            value={filters.ageMin} 
            onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })} 
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Age Range (Max)</label>
          <input 
            type="number" 
            value={filters.ageMax} 
            onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })} 
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label className="block text-gray-700">Sort By</label>
          <select 
            value={filters.sortBy} 
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} 
            className="w-full p-2 border rounded"
          >
            <option value="breed">Breed</option>
            <option value="age">Age</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Order A-Z or Z-A */}
        <div>
          <label className="block text-gray-700">Order</label>
          <select 
            value={filters.sortOrder} 
            onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })} 
            className="w-full p-2 border rounded"
          >
            <option value="asc">A-Z (Ascending)</option>
            <option value="desc">Z-A (Descending)</option>
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-gray-700">State</label>
          <select 
            value={filters.state} 
            onChange={(e) => setFilters({ ...filters, state: e.target.value })} 
            className="w-full p-2 border rounded"
          >
            <option value="">All States</option>
            {usStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City Filter (Only populated if a state is selected) */}
        {filters.state && (
          <div>
            <label className="block text-gray-700">City</label>
            <select 
              value={filters.city} 
              onChange={(e) => setFilters({ ...filters, city: e.target.value })} 
              className="w-full p-2 border rounded"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <button 
        onClick={applyFilters} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
