import React, { useState } from 'react';

const IMDBForm = () => {
  const [IMDbRating, setrating] = useState('');
  const [Review, setreview] = useState('');
  const [MovieName, setMovieName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      IMDbRating: parseFloat(IMDbRating),  // Ensure it's a float
      Review,
      MovieName
    };

    await fetch('http://localhost:5000/api/MovieRating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setrating('');
    setreview('');
    setMovieName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Rating(6.2)" value={IMDbRating} onChange={(e) => setrating(e.target.value)} required />
      <input type="text" placeholder="Movie Review" value={Review} onChange={(e) => setreview(e.target.value)} required />
      <input type="text" placeholder="Movie Name" value={MovieName} onChange={(e) => setMovieName(e.target.value)} required />
      <button type="submit">Add Rating</button>
    </form>
  );
};

export default IMDBForm;
