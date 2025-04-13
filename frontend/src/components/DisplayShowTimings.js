import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
              <td>{show.ShowDate}</td>
              <td>{show.ShowTiming}</td>
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