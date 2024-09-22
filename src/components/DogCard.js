import React from 'react';

const DogCard = ({ dog, addToFavorites, isFavorite }) => (
  <div className="p-4 bg-[#efeadd] shadow-md rounded-lg text-center">
    <img src={dog.img} alt={dog.name} className="w-full h-40 object-cover mb-4 rounded" />
    <h2 className="text-xl font-bold">{dog.name}</h2>
    <p>Breed: {dog.breed}</p>
    <p>Age: {dog.age} years</p>
    <p>Location: {dog.zip_code}</p>

    <button 
      onClick={() => addToFavorites(dog.id)}
      className={`mt-4 px-4 py-2 rounded-lg transition ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800'}`}
    >
      {isFavorite ? 'Unfavorite' : 'Add to Favorites'}
    </button>
  </div>
);

export default DogCard;
