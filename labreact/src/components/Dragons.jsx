// Dragons.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDragons, bookDragon, cancelBooking } from '../app/features/actions/dragonsSlice';

const Dragons = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.dragons);

  useEffect(() => {
    dispatch(fetchDragons());
  }, [dispatch]);

  const handleBookDragon = async (dragonId) => {
    await dispatch(bookDragon(dragonId));
  };

  const handleCancelBooking = async (dragonId) => {
    await dispatch(cancelBooking(dragonId));
  };

  if (loading) {
    return <p>Loading Dragons...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Dragon List</h1>
      {data.map((dragon) => (
        <div key={dragon.id}>
          <h2>{dragon.name}</h2>
          <p>Type: {dragon.type}</p>
          <p>Status: {dragon.isBooked ? 'Booked' : 'Available'}</p>
          <button onClick={() => handleBookDragon(dragon.id)} disabled={dragon.isBooked}>
            {dragon.isBooked ? 'Booked' : 'Book Now'}
          </button>
          <button onClick={() => handleCancelBooking(dragon.id)} disabled={!dragon.isBooked}>
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dragons;
