import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const [PayementType, setPaymentType] = useState("Card");
    const [total, setTotal] = useState(0);
    const username = sessionStorage.getItem('UserName');
    const email = sessionStorage.getItem('Email');
    const userid = sessionStorage.getItem('UserID');
    const [screening, setScreening] = useState(null);
    const [seats, setSeats] = useState(null);

    useEffect(() => {
        if(!sessionStorage.getItem('Email')){
            navigate('/login');
        }

        const { screening, seats } = location.state || {};
        if (!screening || !seats) {
            navigate('/');
            return;
        }

        setScreening(screening);
        setSeats(seats);
        setTotal( screening.Amount * seats.length);
    },[location.state, navigate]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let IsNew = 1;
        try {
            for (const seat of seats) {
                const response = await fetch('http://localhost:5000/api/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        UserID: parseInt(userid),
                        Moviename: screening.Title,
                        ScreenType: screening.ScreenType,
                        ShowDate: screening.ShowDate,
                        MovieTiming: screening.ShowTiming,
                        SeatNumber: seat,
                        IsNew: parseInt(IsNew)
                    })
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to book seat ${seat}`);
                }
                IsNew = 0;
            }
        } catch (err) {
            console.error("Error: " + err.message);
            return;
        }

        try {
                const response = await fetch('http://localhost:5000/api/PaymentReceipt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        UserID: parseInt(userid),
                        Moviename: screening.Title,
                        ScreenType: screening.ScreenType,
                        ShowDate: screening.ShowDate,
                        MovieTiming: screening.ShowTiming,
                        PaymentMethod: PayementType,
                        Amount: total
                    })
                });
    
                if (!response.ok) {
                    throw new Error(`Failed to Generate Receipt`);
                }else{
                    navigate('/user/BookingComplete/');
                }
            }
            catch (err) {
                console.error("Error: " + err.message);
            }
    };
    
    if (!screening || !seats) {
        return <p>Loading booking details...</p>;
    }
    
    return(
    <>
        <h1 className="checkout-title">🎟️ Confirm Your Booking</h1>
        <p className="checkout-subtitle">Review your ticket details and complete your payment below.</p>

        <div className="booking-box">
        <h2>Booking Details</h2>
        <ul>
            <li><strong>Movie:</strong> {screening.Title} </li>
            <li><strong>Date:</strong> {screening.ShowDate} </li>
            <li><strong>Time:</strong> {screening.ShowTiming} </li>
            <li><strong>TheaterID:</strong> {screening.TheaterID} </li>
            <li><strong>Screen Type:</strong> {screening.ScreenType} </li>
            <li><strong>Seats:</strong> {seats.join(', ')}</li>
            <li><strong>Tickets:</strong> {seats.length} </li>
            <li><strong>Total:</strong> Rs.{total} </li>
        </ul>
        <hr />
        <h2>Account Information</h2>
        <ul>
            <li><strong>Username:</strong> {username} </li>
            <li><strong>Email:</strong> {email} </li>
        </ul>
        </div>

        <div className="payment-section">
  <h2>Payment Method</h2>
  <form onSubmit={handleSubmit}>
    <div className="payment-methods">
      <label>
        <input onClick={(e) => {setShowMessage(false); setPaymentType(e.target.value);}} type="radio" name="payment" value="card" defaultChecked />
        Credit/Debit Card
      </label>
      <label style={{ margin: '0.6rem 4.7rem 0.6rem 4.7rem'}}>
        <input style={{ margin: '1rem' }} onClick={(e) => {setShowMessage(true); setPaymentType(e.target.value);}} type="radio" name="payment" value="cash" />
        <pre>Cash on<br /> Arrival  </pre>
      </label>
      {showMessage && (
        <p>Note: Pay 30 minutes before the screening to avoid cancellation.</p>
      )}
    </div>
      <button style={{ marginLeft: '6rem'}} type="submit">Confirm Booking</button>
    </form>
    </div>
    </>
    );
}

export default Checkout;