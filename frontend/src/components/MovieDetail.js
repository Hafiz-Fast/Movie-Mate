import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { title } = useParams();
    const [Movie, setMovie] = useState([]);

    useEffect( () => {
        const Details = async() =>{
                const response = await fetch("http://localhost:5000/api/search-movie", {
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({ MovieName: title })
                });

                const data = await response.json();
                
                setMovie(data[0]);
        };
        
        Details();
    }, [title]);

    return(
        <>
        {Movie && (
            <div className='detailPage'>
                <h1 style={{ marginLeft: "0.5vw" }}>{Movie.Title}</h1><br />
                <div style={{ display:"flex", justifyContent: "center" }}>
                <iframe 
                    width="700" 
                    height="315" 
                    src={Movie.trailer} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
                </div><br />
            <p style={{ textAlign: 'left', marginLeft: "0.5vw" }}>{Movie.Review}</p><br/>
            <div style={{ display: 'flex', gap: '25vw', marginLeft: "0.5vw" }}>
                    <p>MovieType: {Movie.MovieType}</p>
                    <p>Genre: {Movie.Genre}</p>
            </div><br/>

            <div style={{ display: 'flex', gap: '25vw', marginLeft: "0.5vw" }}>
                <p>Runtime: {Movie.Duration} hours</p>
                <p>IMDb Rating: {Movie.IMDbRating}</p>
            </div>
            </div>
        )}
        </>
    );
}

export default MovieDetail;