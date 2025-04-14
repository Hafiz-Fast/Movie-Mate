import React, { useState, useEffect } from 'react';

//function to format duration
const FormatDuration = (Duration) =>{
  const date = new Date(Duration);
  
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
  return `${hours}:${minutes}`;
};

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <table class = "MovieTable">
          <thead>
            <tr>
              <th>MovieID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Type</th>
              <th>Duration</th>
              <th>IMDb Rating</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.MovieID}</td>
                <td>{movie.Title}</td>
                <td>{movie.Genre}</td>
                <td>{movie.MovieType}</td>
                <td>{FormatDuration(movie.Duration)}</td>
                <td>{movie.IMDbRating}</td>
                <td>{movie.Review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowMovies;