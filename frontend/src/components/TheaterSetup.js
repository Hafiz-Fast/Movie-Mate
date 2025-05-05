import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TheaterSetup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [seatRecord, setSeatRecord] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [screening, setScreening] = useState(null);
    const [tickets, setTickets] = useState(null);

    useEffect(() => {
        if(!sessionStorage.getItem('Email')){
            navigate('/login');
            return;
        }

        const { screening, tickets } = location.state || {};
        if (!screening || !tickets) {
            navigate('/');
            return;
        }
        setScreening(screening);
        setTickets(tickets);
        const Availabilty = async() => {
            const response = await fetch("http://localhost:5000/api/seatRecord", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ ShowTimeID: screening.ShowTimeID})
            })

            const data = await response.json();
            setSeatRecord(data.data);
        };

        Availabilty();
    }, []);

    const handleSubmit = () => {
        if(selectedSeats.length === tickets)
            navigate("/user/checkout", {state: { screening: screening, seats:selectedSeats}});
        else{
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
    }

    if (!screening || !tickets) {
        return <p>Data is missing!</p>;
    }

    return (
        <>
            <p className='Screen'>Screen</p>

            <div className='Keys'>
                <div className='board'>
                    <div className='key-item'>
                        <img src='/your_seat.png' alt='Your Seat'></img>
                        <span>Your Seat</span>
                    </div>
                    <div className='key-item'>
                        <img src='/available.png' alt='Available Seat'></img>
                        <span>Available</span>
                    </div>
                    <div className='key-item'>
                        <img src='/sold.png' alt='Sold Seat'></img>
                        <span>Sold</span>
                    </div>
                </div>
            </div>

            {showAlert && (
                <div className="popup-message">
                    You haven't chosen all {tickets} seats.
                </div>
            )}
            {showPopup && (
                <div className="popup-message">
                    You have already selected the maximum number of seats. <br /> Unselect a seat by clicking on it and try again.
                </div>
            )}
            <div className="seat-grid">
                {seatRecord.map(seat => (
                    
                <div
                    key={seat.SeatNumber}
                    data-status={
                    selectedSeats.includes(seat.SeatNumber)
                        ? 'you'
                        : seat.available
                    }
                    className={ !selectedSeats.includes(seat.SeatNumber) && seat.available === 1 && selectedSeats.length === tickets ? "Full":"seat"}
                    style={{ gridArea: seat.SeatNumber }}
                    onClick={() => {
                        if(seat.available){
                            if (selectedSeats.includes(seat.SeatNumber)) {
                                setSelectedSeats(
                                selectedSeats.filter(s => s !== seat.SeatNumber)
                                );
                            }
                            else if (selectedSeats.length < tickets) {
                                setSelectedSeats([...selectedSeats, seat.SeatNumber]);
                            } else {
                                setShowPopup(true);
                                setTimeout(() => setShowPopup(false), 3000); // auto-hide after 3 seconds
                            }
                        }
                    }}
                >
                    <p>{seat.SeatNumber}</p>
                </div>
                ))}
            </div>

            <button style={{ marginLeft: '42rem' }} onClick={handleSubmit}>Proceed to Checkout</button>
        </>
    );
}

export default TheaterSetup;