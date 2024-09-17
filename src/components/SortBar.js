// components/SortBar.js
function SortBar({ sortField, setSortField, sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 mt-4">
      <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md w-full md:w-1/2">
        <label className="font-medium mb-2">Sort By</label>
        <select
          value={sortField} // Only the field (breed, name, age)
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="breed">Breed</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md w-full md:w-1/2">
        <label className="font-medium mb-2">Order</label>
        <select
          value={sortOrder} // Only the order (asc, desc)
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SortBar;
