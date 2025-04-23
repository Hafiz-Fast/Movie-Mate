import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    const [refresh, setRefresh] = useState(false);
    const [Nmovies, setNMovies] = useState([]);
    const [CMovies, setCMovies] = useState([]);

    const handleDataChange = () =>{
      setRefresh(prev => !prev);
    }

    const fetchNowShowing = () => {
      fetch('http://localhost:5000/api/Screenings')
        .then(res => res.json())
        .then(data => setNMovies(data));
    };
    
    const fetchComingSoon = () => {
      fetch('http://localhost:5000/api/Coming-soon')
        .then(res => res.json())
        .then(data => setCMovies(data));
    };

    useEffect(() => {
      fetchNowShowing();
      fetchComingSoon();
    }, [refresh]);
    

    return(
        <>
            <div className='Nav'>
              <ul>
                <li><Link to = "/user/home">Home</Link></li>
                <li><Link to = "/user/movies">Movies</Link></li>
              </ul>
            </div>
            <br /><br /><br /><br />
            <span>Now Showing</span>
            <hr style={{ marginTop: 0, border: 'none', borderTop: '4px solid #ffa14a' }} />
            <div className='Grid'>
              {Nmovies.map((movie) => (
                  <div key = {movie.Title} className = 'Movies'>
                    <img src= {movie.links} alt={movie.Title}></img>
                    <br />{movie.Title}<br />
                    <div className='Booking'>Book Now</div>
                  </div> 
              ))}
            </div>
            <span>Coming Soon</span>
            <hr style={{ marginTop: 0, border: 'none', borderTop: '4px solid #ffa14a' }} />
            <div className='Grid' style={{ paddingBottom: "10rem" }}>
              {CMovies.map((movie) => (
                  <div key = {movie.Title} className = 'Movies'>
                    <img src= {movie.links} alt={movie.Title}></img>
                    <br />{movie.Title}<br />
                  </div> 
              ))}
            </div>
        </>
    );
};

export default Home;