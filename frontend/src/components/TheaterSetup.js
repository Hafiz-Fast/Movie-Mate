import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TheaterSetup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { screening, tickets } = location.state || {};
    const [seatRecord, setSeatRecord] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const Availabilty = async() => {
            const response = await fetch("http://localhost:5000/api/seatRecord", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ TheaterID: screening.TheaterID})
            })

            const data = await response.json();
            setSeatRecord(data.data);
        };

        Availabilty();
    }, []);

    const handleSubmit = () => {
        navigate("/user/checkout", {state: { screening: screening, seats:selectedSeats}});
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

        

            <div className="seat-grid">
                {seatRecord.map(seat => (
                    
                <div
                    key={seat.SeatNumber}
                    className="seat"
                    data-status={
                    selectedSeats.includes(seat.SeatNumber)
                        ? 'you'
                        : seat.available
                    }
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
                            }
                        }
                    }}
                >
                    <p>{seat.SeatNumber}</p>
                </div>
                ))}
            </div>

            <button style={{ marginLeft: '45rem' }} onClick={handleSubmit}>Proceed</button>
        </>
    );
}

export default TheaterSetup;