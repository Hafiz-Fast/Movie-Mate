import React, { useState } from 'react';

const DeleteRating = () => {
  const [RatingID, setRatingID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/api/delete_rating', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ RatingID })
    });

    setRatingID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Rating ID"
        value={RatingID}
        onChange={(e) => setRatingID(e.target.value)}
        required
      />
      <button type="submit">Delete Rating</button>
    </form>
  );
};

export default DeleteRating;
