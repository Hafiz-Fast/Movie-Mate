import React, { useEffect, useState } from 'react';
import axios from 'axios';

//function to format duration
const FormatDuration = (Duration) =>{
  const date = new Date(Duration);
  
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
  return `${hours}:${minutes}`;
};

//function to format Date
const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Shows')
      .then(res => setShows(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <table class = "MovieTable">
        <thead>
          <tr>
            <th>ShowID</th>
            <th>MovieID</th>
            <th>TheaterID</th>
            <th>ShowDate</th>
            <th>ShowTiming</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show, index) => (
            <tr key={index}>
              <td>{show.ShowTimeID}</td>
              <td>{show.MovieID}</td>
              <td>{show.TheaterID}</td>
              <td>{formatDate(show.ShowDate)}</td>
              <td>{FormatDuration(show.ShowTiming)}</td>
              <td>{show.Amount}</td>
              <td>{show.Category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowList;