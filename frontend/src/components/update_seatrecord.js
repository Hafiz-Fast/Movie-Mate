import React, { useState } from 'react';

const Update_seatrecord = () => {
  const [ID, setID] = useState('');
  const[TotalSeats, setTotalSeats] = useState('');
  const [AvailableSeats, setAvailableSeats] = useState('');
  const[OccupiedSeats, setOccupiedSeats] = useState('');
  const [FemaleSeats, setFemaleSeats] = useState('');
  const[MaleSeats, setMaleSeats] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ID: parseInt(ID),
      totals:parseInt(TotalSeats),
      availSeats:parseInt(AvailableSeats),
      Occupied:parseInt(OccupiedSeats),
      f:parseInt(FemaleSeats),
      m:parseInt(MaleSeats)
    }
    await fetch('http://localhost:5000/api/update_seatrecord', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setID('');
    setTotalSeats('');
    setAvailableSeats('');
    setOccupiedSeats('');
    setFemaleSeats('');
    setMaleSeats('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Seat Record ID" value={ID} onChange={(e) => setID(e.target.value)} required />
      <input type="number" placeholder="Total Seats" value={TotalSeats} onChange={(e) => setTotalSeats(e.target.value)} required />
      <input type="number" placeholder="Available Seats" value={AvailableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
      <input type="number" placeholder="Occupied Seats" value={OccupiedSeats} onChange={(e) => setOccupiedSeats(e.target.value)} required />
      <input type="number" placeholder="Female Count" value={FemaleSeats} onChange={(e) => setFemaleSeats(e.target.value)} required />
      <input type="number" placeholder="Male Count" value={MaleSeats} onChange={(e) => setMaleSeats(e.target.value)} required />
      <button type="submit">Update Seat Record</button>
    </form>
  );
};

export default Update_seatrecord;