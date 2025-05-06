import React, { useState } from 'react';

const MovieForm = () => {
  const [Title, setTitle] = useState('');
  const [MovieType, setMovieType] = useState('');
  const [Genre, setGenre] = useState('');
  const [Duration, setDuration] = useState('');
  const [links, setLinks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDuration = `${Duration}:00`;
    console.log('Formatted Duration:', formattedDuration); //For Confirmation

    await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Title, MovieType, Genre, Duration:formattedDuration, links })
    });

    setTitle('');
    setMovieType('');
    setGenre('');
    setDuration('');
    setLinks('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={Title} onChange={(e) => setTitle(e.target.value)} required />
      <input list="MovieTypes" placeholder="MovieType" value={MovieType} onChange={(e) => setMovieType(e.target.value)} required />
      <datalist id = "MovieTypes">
        <option value="HollyWood" />
        <option value="BollyWood" />
        <option value="LollyWood" />
      </datalist>
      <input list="Genres" placeholder="Genre" value={Genre} onChange={(e) => setGenre(e.target.value)} required />
      <datalist id = "Genres">
        <option value="Action" />
        <option value="Adventure" />
        <option value="Comedy" />
        <option value="Drama" />
        <option value="Fantasy" />
        <option value="Horror" />
        <option value="Mystery" />
        <option value="Romance" />
        <option value="Sci-Fi" />
        <option value="Thriller" />
      </datalist>
      <input type="time" Duration value={Duration} onChange={(e) => setDuration(e.target.value)} required />
      <input type="text" placeholder="Link" value={links} onChange={(e) => setLinks(e.target.value)} required />
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
