import React, { useState } from 'react';

const AddPriceForm = () => {
  const [Category, setCategory] = useState('');
  const [Amount, setAmount] = useState('');
  const [ShowID, setShowID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/Prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Category,
        Amount:parseFloat(Amount),
        ShowID:parseInt(ShowID)
      })
    });
    setCategory('');
    setAmount('');
    setShowID('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Select Category (Student, Bachelor, Children, Old)" value={Category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="number" placeholder="Enter Amount" value={Amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="number" placeholder="Enter ShowID" value={ShowID} onChange={(e) => setShowID(e.target.value)} required />
      <button type="submit">Add Price</button>
    </form>
  );
};

export default AddPriceForm;