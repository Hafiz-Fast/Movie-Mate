import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TheaterList = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/theaters')
      .then(res => setTheaters(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <table class = "MovieTable">
        <thead>
          <tr>
            <th>Theater ID</th>
            <th>Screen Type</th>
            <th>SeatRecord ID</th>
            <th>Total Seats</th>
            <th>Available Seats</th>
            <th>Occupied Seats</th>
          </tr>
        </thead>
        <tbody>
          {theaters.map((theater, index) => (
            <tr key={index}>
              <td>{theater.TheaterID}</td>
              <td>{theater.ScreenType}</td>
              <td>{theater.SeatRecordID}</td>
              <td>{theater.TotalSeats}</td>
              <td>{theater.AvailableSeats}</td>
              <td>{theater.OccupiedSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TheaterList;