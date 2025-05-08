import React, { useState } from 'react';

const AdmChangePass = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/AdmPass', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setEmail('');
      }

    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
            <button type="submit">Reset</button>
        </form>
    )
}

export default AdmChangePass;