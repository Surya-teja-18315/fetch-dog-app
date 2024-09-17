// components/FilterBar.js
function FilterBar({ breeds, states, filters, setFilters }) {
    return (
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
          <label className="font-medium mb-2">Breed</label>
          <select
            multiple
            value={filters.breeds}
            onChange={(e) => setFilters({ ...filters, breeds: Array.from(e.target.selectedOptions, option => option.value) })}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
          <label className="font-medium mb-2">City</label>
          <input
            type="text"
            placeholder="Enter city"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
          <label className="font-medium mb-2">State</label>
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
          <label className="font-medium mb-2">Age Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin}
              onChange={(e) => setFilters({ ...filters, ageMin: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax}
              onChange={(e) => setFilters({ ...filters, ageMax: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    );
  }
  
  export default FilterBar;
  