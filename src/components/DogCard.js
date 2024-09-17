// components/DogCard.js
import { useEffect, useState } from 'react';
import axios from 'axios';

function DogCard({ dogId, onFavorite }) {
  const [dog, setDog] = useState(null);

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [dogId], { withCredentials: true });
        setDog(response.data[0]);
      } catch (error) {
        console.error('Error fetching dog details', error);
      }
    };
    fetchDogDetails();
  }, [dogId]);

  if (!dog) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-4">{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Location: {dog.zip_code}</p>
      <button
        onClick={() => onFavorite(dog.id)}
        className="w-full mt-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        {`Favorite`}
      </button>
    </div>
  );
}

export default DogCard;
