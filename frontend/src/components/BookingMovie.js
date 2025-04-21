import React, { useState } from 'react';

const BookingMovie = () => {
    const [UserID, setUserID] = useState('');
    const [Moviename, setMovie] = useState('');
    const [ScreenType, setScreenType] = useState('');
    const [ShowDate, setShowDate] = useState('');
    const [MovieTiming, setMovieTiming] = useState('');
    const [SeatNumber, setSeatNumber] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/booking', {
            method: 'POST',
            headers: {'Content-Type': '/application/json'},
            body: JSON.stringify({ UserID: parseInt(UserID), Moviename, ScreenType, ShowDate, MovieTiming, SeatNumber })
        })

        const data = await response.json();
        const message = data.message;

        console.log("message:", message);

        setUserID('');
        setMovie('');
        setScreenType('');
        setShowDate('');
        setMovieTiming('');
        setSeatNumber('');
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='number' step="1" placeholder='id' value={UserID} onChange={(e) => setUserID(e.target.value)} required /><br /><br />
                <input type='text' placeholder='movie' value={Moviename} onChange={(e) => setMovie(e.target.value)} required /><pre>        </pre>
                <input type='text' placeholder='screen' value={ScreenType} onChange={(e) => setScreenType(e.target.value)} required /><br /><br />
                <input type='date' placeholder='date' value={ShowDate} onChange={(e) => setShowDate(e.target.value)} required /><br /><br />
                <input type="time" placeholder='MovieTime' value={MovieTiming} onChange={(e) => setMovieTiming(e.target.value)} required/><br /><br />
                <input type='text' placeholder='SeatNum' value={SeatNumber} onChange={(e) => setSeatNumber(e.target.value)} required />
                <button type='submit'>Confirm Booking</button>
            </form>
        </>
    )
}

export default BookingMovie;