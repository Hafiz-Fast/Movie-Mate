import React, { useState, useEffect } from 'react';

const Screening = () => {
    const [screening, setScreening] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
    fetch('http://localhost:5000/api/Screenings')
      .then(res => res.json())
      .then(data => setScreening(data));
  }, [refresh]);

    const handleScreeningAdded = () => {
        setRefresh(prev => !prev);
    }

    return(
        <div>
      <h2>Screenings</h2>
      <table border='1' style={{ width: '100%', textAlign: 'left' }}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Movie Type</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>ShowTiming</th>
                <th>ScreenType</th>
            </tr>
        </thead>
        <tbody>
            {screening.map((screen) => (
                <tr key={screen.Title}>
                    <td>{screen.Title}</td>
                    <td>{screen.MovieType}</td>
                    <td>{screen.Genre}</td>
                    <td>{screen.Duration}</td>
                    <td>{screen.ShowTiming}</td>
                    <td>{screen.ScreenType}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
    );
};

export default Screening;