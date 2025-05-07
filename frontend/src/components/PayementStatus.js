import React, { useState } from 'react';

const PayementStatus = () =>{
    const [bookingID, setBooking] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await fetch('http://localhost:5000/api/tasks', {
            Method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({bookingID, status})
        }
        );

        setBooking('');
        setStatus('');
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' placeHolder="Booking ID" value={bookingID} onChange={(e) => setBooking(e.target.value)} required/><br /><br />
            <input type='text' placeHolder="New Booking Status" value={status} onChange={(e) => setStatus(e.target.value)} required/><br /><br />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default PayementStatus;