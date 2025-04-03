import React, { useState } from 'react';

const UpdateIMDbForm = () => {
  const [MovieName, setName] = useState('');
  const[NewRating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        MovieName,
        NewRating:parseFloat(NewRating)
    }
    await fetch('http://localhost:5000/api/MovieRating', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setName('');
    setRating('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="MovieName" value={MovieName} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="IMDb Rating" value={NewRating} onChange={(e) => setRating(e.target.value)} required />
      <button type="submit">Update Rating</button>
    </form>
  );
};

export default UpdateIMDbForm;