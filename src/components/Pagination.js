import React from 'react';

const Pagination = ({ currentPage, totalResults, setCurrentPage, pageSize }) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200">
        {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
