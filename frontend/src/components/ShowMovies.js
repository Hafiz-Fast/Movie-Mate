import React, { useState, useEffect } from 'react';

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
                <td>{movie.Title}</td>
                <td>{movie.Genre}</td>
                <td>{movie.MovieType}</td>
                <td>{movie.Duration}</td>
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