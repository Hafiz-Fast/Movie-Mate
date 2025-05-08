import React , { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const debounceRef = useRef(null);

    const fetchMovies = useCallback(async() =>{
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
    },[search]);

    useEffect(() => {
      if(sessionStorage.getItem('Email')){
        setLoggedIn(true);
      }

      if(debounceRef.current)
        clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        fetchMovies();
      }, 500);

      return () => clearTimeout(debounceRef.current);

    },[search, fetchMovies]);

    return(
        <>
            <div className='Nav'>
              <form className='NavBar'>
                <input className='NavSearch' type='text' placeholder='Search Movies' value={search} onChange={(e) => setSearch(e.target.value)} />
              </form>
              <ul>
                <li><Link to = "/user/home">Home</Link></li>
                <li><Link to = "/user/movies">Movies</Link></li>
                {loggedIn && (<Link to = "/user/PassUp" className="new-link">Change Password</Link>)}
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