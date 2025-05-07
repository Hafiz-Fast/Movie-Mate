import React, { useState } from 'react';

const ScreeningSearch = () => {
    const [MovieName, setName] = useState('');
    const [screenings, setScreening] = useState([]);
    
        const handleSubmit = async(e) => {
            e.preventDefault();
    
            const response = await fetch('http://localhost:5000/api/search-screening', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({MovieName})
            }
            );
            
            const data = await response.json();
            setScreening(data);
            setName('');
        };
    
        return(
            <>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='MovieName' value={MovieName} onChange={(e) => setName(e.target.value)} required /><br /><br />
                    <button type="submit">Search Screening Times</button>
                </form>
                <h2>Searched Screenings</h2>
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
                        {screenings.map((screen) => (
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
            </>
        );
};

export default ScreeningSearch;