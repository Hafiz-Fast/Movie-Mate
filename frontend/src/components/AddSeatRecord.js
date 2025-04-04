import React, { useState } from 'react';

const AddSeatRecord = () => {
  const [Total, setTotalSeats] = useState('');
  const [TheaterID, setID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/TheaterSeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Total: parseInt(Total),
        TheaterID: parseInt(TheaterID)
      })
    });
    setTotalSeats('');
    setID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Enter Total Seats" value={Total} onChange={(e) => setTotalSeats(e.target.value)} required />
      <input type="number" placeholder="Enter Theater ID" value={TheaterID} onChange={(e) => setID(e.target.value)} required />
      <button type="submit">Add Seat Record</button>
    </form>
  );
};

export default AddSeatRecord;