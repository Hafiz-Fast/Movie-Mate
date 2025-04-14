import React, { useState } from 'react';

const MovieForm = () => {
  const [Title, setTitle] = useState('');
  const [MovieType, setMovieType] = useState('');
  const [Genre, setGenre] = useState('');
  const [Duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDuration = `${Duration}:00`;
    console.log('Formatted Duration:', formattedDuration); //For Confirmation

    await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Title, MovieType, Genre, Duration:formattedDuration })
    });

    setTitle('');
    setMovieType('');
    setGenre('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={Title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="MovieType" value={MovieType} onChange={(e) => setMovieType(e.target.value)} required />
      <input type="text" placeholder="Genre" value={Genre} onChange={(e) => setGenre(e.target.value)} required />
      <input type="time" Duration value={Duration} onChange={(e) => setDuration(e.target.value)} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
