import React, { useState } from 'react';

function convertTo24Hour(timeStr) {
    const date = new Date(`1970-01-01T${timeStr}`);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}:00`;
}

const AddShowTime = () => {
  const [MovieID, setMovieID] = useState('');
  const [TheaterID, setID] = useState('');
  const [Date, setDate] = useState('');
  const [ShowTime, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const convertedtime = convertTo24Hour(ShowTime);
    await fetch('http://localhost:5000/api/ShowTime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        MovieID: parseInt(MovieID),
        TheaterID: parseInt(TheaterID),
        Date,
        convertedtime
      })
    });
    setMovieID('');
    setID('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Enter MovieID" value={MovieID} onChange={(e) => setMovieID(e.target.value)} required />
      <input type="number" placeholder="Enter TheaterID" value={TheaterID} onChange={(e) => setID(e.target.value)} required />
      <input type="date" placeholder="Enter ShowDate" value={Date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" placeholder="Enter ShowTime" value={ShowTime} onChange={(e) => setTime(e.target.value)} required />
      <button type="submit">Add Seat Record</button>
    </form>
  );
};

export default AddShowTime;