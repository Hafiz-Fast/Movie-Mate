import React, { useState, useEffect } from 'react';

const ShowTheaters = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Theater', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTheaters(data);
      } catch (err) {
        console.error('Error fetching theaters:', err);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <div>
      {theaters.length === 0 ? (
        <p>No Theaters found.</p>
      ) : (
        <table class = "TheaterTable">
          <thead>
            <tr>
              <th>TheaterID</th>
              <th>ScreenType</th>
              <th>TotalSeats</th>
              <th>AvailableSeats</th>
              <th>OccupiedSeats</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater, index) => (
              <tr key={index}>
                <td>{theater.TheaterID}</td>
                <td>{theater.ScreenType}</td>
                <td>{theater.TotalSeats}</td>
                <td>{theater.AvailableSeats}</td>
                <td>{theater.OccupiedSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowTheaters;