import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSuccessPage = () => {
    const navigate = useNavigate();

    return(
        <div className="success-container">
            <div className="success-message">
                <h1>Booking Successful!</h1>
                <p>Your movie booking has been confirmed. Enjoy the show!</p>
            </div>
            <button className="home-button" onClick={() => navigate('/user/')}>
                Go to Home
            </button>
        </div>
    );
};

export default BookingSuccessPage;