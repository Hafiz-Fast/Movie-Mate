import React, { useState } from 'react';

const Delete_seatrecord = () => {
  const [SeatId, setSeatId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/api/delete_seatrecord', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ SeatId })
    });

    setSeatId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="SeatRecordID" value={SeatId} onChange={(e) => setSeatId(e.target.value)} required />
      <button type="submit">Delete Seat Record</button>
    </form>
  );
};

export default Delete_seatrecord;
