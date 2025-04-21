import React, { useState, useEffect } from 'react';

const Browse = () => {
    const [refresh, setRefresh] = useState(false);
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
    fetch('http://localhost:5000/api/Movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, [refresh]);

    const handleMovieAdded = () => {
        setRefresh(prev => !prev);
    }

    return(
      <div>
        <h2>Movie List</h2>
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Movie Title</th>
                  <th>Movie Genre</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
              {movies.map((movie) => (
                  <tr key={movie.Title}>
                    <td>{movie.Title}</td>
                    <td>{movie.Genre}</td>
                    <td>{movie.Duration}</td>
                  </tr>              
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default Browse;