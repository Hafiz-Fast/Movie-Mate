import React, { useState } from 'react';

const DeleteShowTime = () => {
  const [ShowTimeID, setShowTimeID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/api/delete_seatrecord', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ShowTimeID })
    });

    setShowTimeID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Show Time ID" value={ShowTimeID} onChange={(e) => setShowTimeID(e.target.value)} required />
      <button type="submit">Show Time</button>
    </form>
  );
};

export default DeleteShowTime;
