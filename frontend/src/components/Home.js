import React , { useState, useEffect } from 'react';

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
            
        </>
    );
};

export default Home;