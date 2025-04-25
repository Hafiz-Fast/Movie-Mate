import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [debounceTimeOut, setDebounceTimeOut] = useState(null);

    const handleDataChange = () =>{
      setRefresh(prev => !prev);
    }

    const fetchMovies = async() =>{
      if (search) {
        const response = await fetch('http://localhost:5000/api/search-movie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ MovieName: search.trim() })
        });
        const data = await response.json();
        setMovies(data);  // Set search results
      } else {
          const response = await fetch('http://localhost:5000/api/browseMovies');
          const data = await response.json();
          setMovies(data);  // Set default movies
      }
    };

    useEffect(() => {
      if(debounceTimeOut)
        clearTimeout(debounceTimeOut);

      const newDebounceTimeOut = setTimeout(() => {
        fetchMovies();
      }, 500);

      setDebounceTimeOut(newDebounceTimeOut);

      return () => clearTimeout(newDebounceTimeOut);

    },[refresh, search]);

    return(
        <>
            <div className='Nav'>
              <form className='NavBar'>
                <input className='NavSearch' type='text' placeholder='Search Movies' value={search} onChange={(e) => setSearch(e.target.value)} />
              </form>
              <ul>
                <li><Link to = "/user/home">Home</Link></li>
                <li><Link to = "/user/movies">Movies</Link></li>
              </ul>
            </div>
            <br /><br /><br /><br />
            <h1 className = 'M-Title' style={{ marginBottom: 0 }}><span className = 'M-Style'>M</span>ovies</h1>
            <hr style={{ marginTop: 0, border: 'none', borderTop: '4px solid #ffa14a' }} />
            <div className='Grid' style={{ paddingBottom: "10rem" }}>
              {movies.map((movie) => (
                  <div key = {movie.Title} className = 'Movies'>
                    <Link to = {`/user/movies/${encodeURIComponent(movie.Title)}`}><img src= {movie.links} alt={movie.Title}></img>
                    <br />{movie.Title}</Link><br />
                  </div> 
              ))}
            </div>
        </>
    );
};

export default Movies;