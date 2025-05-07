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
            <h1 className='M-Title' style={{ marginBottom: 0 }}>Welcome To</h1><br />
            <h1 className = 'M-Title'><span className = 'M-Style'>M</span>ovie<span className = 'M-Style'>M</span>ate</h1>
            <p>Welcome to MovieMate – Your gateway to the enchanting universe of cinema.<br /> From breathtaking blockbusters to captivating indie gems, experience the art of storytelling brought to life on the big screen,<br /> crafted just for true movie lovers like you.</p>
            <span>Now Showing</span>
            <hr style={{ marginTop: 0, border: 'none', borderTop: '4px solid #ffa14a' }} />
            {Nmovies.length > 0 ? (<div className='Grid'>
              {Nmovies && Nmovies.map((movie) => (
                  <div key = {movie.Title} className = 'Movies'>
                    <Link to={`/user/booking/${encodeURIComponent(movie.Title)}`}><img src= {movie.links} alt={movie.Title}></img>
                    <br />{movie.Title}<br /></Link>
                    <div className='Booking'>Book Now</div>
                  </div> 
              ))}
            </div>
            ) : (
              <h1 style={{ textAlign: 'center', padding: '9rem 0' }}>No Shows are available Right now</h1>
            )}
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