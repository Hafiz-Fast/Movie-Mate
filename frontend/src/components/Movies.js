import React , { useState, useEffect } from 'react';

const Movies = () => {
    const [refresh, setRefresh] = useState(false);
    const [movies, setMovies] = useState([]);

    const handleDataChange = () =>{
      setRefresh(prev => !prev);
    }

    useEffect(() => {
      fetch('http://localhost:5000/api/Movies')
        .then(res => res.json())
        .then(data => setMovies(data));
    }, [refresh]);
    

    return(
        <>
            
        </>
    );
};

export default Movies;