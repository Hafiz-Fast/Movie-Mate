import React, { useState } from 'react';

const Update_movie = () => {
  const [movieid, setmovieid] = useState('');
  const[title, settitle] = useState('');
  const [type, settype] = useState('');
  const[genre, setgenre] = useState('');
  const [duration, setduration] = useState('');
  const[ratingid, setratingid] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      movieid: parseInt(movieid),
      title:parseInt(title),
      type:parseInt(type),
      genre:parseInt(genre),
      duration:parseInt(duration),
      ratingid:parseInt(ratingid)
    }
    await fetch('http://localhost:5000/api/Update_showtimings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setmovieid('');
    settitle('');
    settype('');
    setgenre('');
    setduration('');
    setratingid('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Movie ID" value={movieid} onChange={(e) => setmovieid(e.target.value)} required />
      <input type="number" placeholder="Title" value={title} onChange={(e) => settitle(e.target.value)} required />
      <input type="number" placeholder="Type" value={type} onChange={(e) => settype(e.target.value)} required />
      <input type="number" placeholder="Genre" value={genre} onChange={(e) => setgenre(e.target.value)} required />
      <input type="number" placeholder="Duration" value={duration} onChange={(e) => setduration(e.target.value)} required />
      <input type="number" placeholder="Rating ID" value={ratingid} onChange={(e) => setratingid(e.target.value)} required />
      <button type="submit">Update movie</button>
    </form>
  );
};

export default Update_movie;