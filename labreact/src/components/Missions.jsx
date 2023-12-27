// Missions.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, bookMission, cancelBooking } from '../app/features/actions/missionsSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.missions);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  const handleBookMission = async (missionId) => {
    await dispatch(bookMission(missionId));
  };

  const handleCancelBooking = async (missionId) => {
    await dispatch(cancelBooking(missionId));
  };

  if (loading) {
    return <p>Loading Missions...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Missions List</h1>
      {data.map((mission) => (
        <div key={mission.mission_id}>
          <h2>{mission.mission_name}</h2>
          <p>Description: {mission.description}</p>
          <p>Status: {mission.isBooked ? 'Booked' : 'Available'}</p>
          <button onClick={() => handleBookMission(mission.mission_id)} disabled={mission.isBooked}>
            {mission.isBooked ? 'Booked' : 'Book Now'}
          </button>
          <button onClick={() => handleCancelBooking(mission.mission_id)} disabled={!mission.isBooked}>
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
};

export default Missions;
