import React from 'react';
import DogCard from './DogCard';

const DogList = ({ dogs, addToFavorites, favorites }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          addToFavorites={addToFavorites}  // Passing addToFavorites function to DogCard
          isFavorite={favorites.includes(dog.id)}  // Checking if the dog is in favorites
        />
      ))}
    </div>
  );
};

export default DogList;
