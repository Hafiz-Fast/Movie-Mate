import React, { useState } from 'react';

const Update_showtimings = () => {
  const [ShowTimeID, setShowTimeID] = useState('');
  const [movieid, setMovieID] = useState('');
  const [theaterid, setTheaterID] = useState('');
  const [showdate, setShowDate] = useState('');
  const [showtiming, setShowTiming] = useState('');
  const [priceid, setPriceID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ShowTimeID: parseInt(ShowTimeID),
      movieid: parseInt(movieid),
      theaterid: parseInt(theaterid),
      showdate,
      showtiming,
      priceid: parseInt(priceid)
    };

    await fetch('http://localhost:5000/api/Update_showtimings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Reset form
    setShowTimeID('');
    setMovieID('');
    setTheaterID('');
    setShowDate('');
    setShowTiming('');
    setPriceID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="ShowTime ID" value={ShowTimeID} onChange={(e) => setShowTimeID(e.target.value)} required />
      <input type="number" placeholder="Movie ID" value={movieid} onChange={(e) => setMovieID(e.target.value)} required />
      <input type="number" placeholder="Theater ID" value={theaterid} onChange={(e) => setTheaterID(e.target.value)} required />
      <input type="date" placeholder="Show Date" value={showdate} onChange={(e) => setShowDate(e.target.value)} required />
      <input type="time" placeholder="Show Timing" value={showtiming} onChange={(e) => setShowTiming(e.target.value)} required />
      <input type="number" placeholder="Price ID" value={priceid} onChange={(e) => setPriceID(e.target.value)} required />
      <button type="submit">Update Show Timings</button>
    </form>
  );
};

export default Update_showtimings;
