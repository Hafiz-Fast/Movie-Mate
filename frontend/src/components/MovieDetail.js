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
            <div className='Grid' style={{gridTemplateColumns: '25% 25% 25% 25%', rowGap:'5vh', paddingBottom: '2vh', paddingTop: '2vh'}}>
                <p style={{ color:'#88a4c4' }}>MovieType: </p><p>{Movie.MovieType}</p>
                <p style={{ color:'#88a4c4' }}>Genre: </p><p>{Movie.Genre}</p>
                <p style={{ color:'#88a4c4' }}>Runtime: </p><p>{Movie.Duration} hours</p>
                <p style={{ color: '#88a4c4'}}>IMDb Rating: </p><p style={{ color:'#f0993d' }}>{Movie.IMDbRating}</p>
            </div>
            </div>
        )}
        </>
    );
}

export default MovieDetail;