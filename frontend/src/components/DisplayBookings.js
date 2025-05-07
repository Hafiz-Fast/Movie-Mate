import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/Bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <table class = "MovieTable" style={{height: '37vh'}}>
        <thead>
          <tr>
            <th>BookingID</th>
            <th>UserName</th>
            <th>SeatNumbers</th>
            <th>ShowTimeID</th>
            <th>PaymentMethod</th>
            <th>PaymentStatus</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.BookingID}</td>
              <td>{booking.UserName}</td>
              <td  style={{ overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '50px'}}>{booking.SeatNumbers}</td>
              <td>{booking.ShowTimeID}</td>
              <td>{booking.PaymentMethod}</td>
              <td>{booking.PaymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;