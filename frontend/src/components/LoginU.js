import React, { useState } from 'react';

const LoginU = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [messageColor, setMessageColor] = useState('black');
  const [loginS, setLoginS] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response = await fetch('http://localhost:5000/api/login-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          setMessageColor('green');
          setBookings(data.data); // set all bookings
          setUsername('');
          setPassword('');
          setLoginS(true);
        }else if(!response.ok && data.errors){
          let errorMessages = '';
            data.errors.forEach(error => {
            errorMessages += `${error.msg}<br />`;
            });
            setMessage(errorMessages);
            setMessageColor('red');
            setLoginS(false);
        } 
        else {
          setMessage(data.message || 'Login failed');
          setMessageColor('red');
          setBookings([]); // clear if any
          setLoginS(false);
        }
      }
      catch(err){
        setMessage('An error occurred');
        setMessageColor('red');
        setBookings([]);
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      {message && (
        <p
          style={{ color: messageColor }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {bookings.length === 0 && loginS === true && (
        <div>
          <h3>There are no present Bookings</h3>
        </div>
      )}
      {bookings.length > 0 && loginS === true && (
        <div>
          <h3>Your Bookings</h3>
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Seat Number</th>
                <th>ShowTime ID</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.BookingID}>
                  <td>{booking.BookingID}</td>
                  <td>{booking.SeatNumber}</td>
                  <td>{booking.ShowTimeID}</td>
                </tr>              
              ))}
            </tbody>
          </table>
        </div>
      )}
      </>
  );
};

export default LoginU;