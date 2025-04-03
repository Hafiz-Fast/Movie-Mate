import React, { useState } from 'react';

const DeleteMovieForm = () => {
  const [MovieName, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/movies', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ MovieName })
    });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="MovieName" value={MovieName} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Delete Movie</button>
    </form>
  );
};

export default DeleteMovieForm;