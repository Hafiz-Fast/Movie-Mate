import React, { useState } from 'react'

const SearchMovie = () => {
    const [MovieName, setName] = useState('');
    const [movies, setMovie] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5000/api/search-movie', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({MovieName})
        }
        );
        const data = await response.json();

        setMovie(data);
        setName('');
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='MovieName' value={MovieName} onChange={(e) => setName(e.target.value)} required /><br /><br />
                <button type="submit">Search Movie</button>
            </form>
            <h2>Searched List</h2>
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
                        <tr key={movie.MovieID}>
                        <td>{movie.Title}</td>
                        <td>{movie.Genre}</td>
                        <td>{movie.Duration}</td>
                        </tr>              
                    ))}
                    </tbody>
                </table>
        </>
    );
};

export default SearchMovie;