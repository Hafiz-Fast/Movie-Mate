import React, { useState } from 'react';

const AddTheaterForm = () => {
  const [ScreenType, setScreen] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/Theater', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ScreenType})
    });
    setScreen('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={ScreenType} onChange={(e) => setScreen(e.target.value)} required>
        <option value="">Select ScreenType</option>
        <option value="Bronze">Bronze</option>
        <option value="Silver">Silver</option>
        <option value="Gold">Gold</option>
        <option value="Platinum">Platinum</option>
      </select>
      <button type="submit">Add Theater</button>
    </form>
  );
};

export default AddTheaterForm;