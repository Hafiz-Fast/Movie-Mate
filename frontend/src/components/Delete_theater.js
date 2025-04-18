import React, { useState } from 'react';

const Delete_theater = () => {
  const [theaterid, setTheaterID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/api/Delete_theater', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theaterid })
    });

    setTheaterID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Theater ID"
        value={theaterid}
        onChange={(e) => setTheaterID(e.target.value)}
        required
      />
      <button type="submit">Delete Theater</button>
    </form>
  );
};

export default Delete_theater;
