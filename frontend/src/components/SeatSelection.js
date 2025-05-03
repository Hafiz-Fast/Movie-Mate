import React , { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const SeatSelection = ({ selectedScreen }) => {
    const [seatCount, setSeatCount] = useState(0);
    const [count, setCount] = useState(1);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const seats = async() => {
            try{
                const response = await fetch("http://localhost:5000/api/seats", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ TheaterID: selectedScreen.TheaterID})
                })

                const data = await response.json();
                setSelected(data.data[0]);
                setSeatCount(data.data[0].AvailableSeats);
            }
            catch(error){
                console.error("Error receiving data");
            }
        };
        seats();
        setCount(0);
    },[selectedScreen]);

    const handleSubmit = () => {
        Navigate('/user/booking/', {state: { title: 'Inception', time: '7:00 PM' } });
    }

    return(
        <>
        <div style={{ display: 'flex', gap: '8vw', border:'2px solid white', paddingTop: '5vh', paddingBottom: '5vh' }}>
            <h2 style={{ paddingLeft: '3vw', paddingRight: '20vw', position: 'relative', top: '1.5vh' }}>Tickets</h2>
            <div style={{ display: 'flex', flexDirection:'column', position:'relative',bottom:'2.8vh'}}>
                <p style={{ margin: '0', marginRight:'8vw', position:'relative', left:'4.1vw' }}>Price</p>
                <p style={{ margin: '0' }}>{`${selectedScreen.Amount ? selectedScreen.Amount : 'Not Set'}`}</p>    
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: "8px", height: '2.55rem', position:'relative', top:'0.8vw'}}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, fontSize: 0 }}>
                    <button style={{ cursor: count === 0 ? 'not-allowed' : 'pointer'}} className={`lessB ${count === 1  ? 'start' : ''}`} onClick={() => {if(count > 1) setCount(count - 1);}}>-</button>
                    <div style={{padding:'1vh 2vw', backgroundColor: 'white', color: 'black', fontSize: '1rem' }}>{count}</div>
                    <button style={{ cursor: count === seatCount ? 'not-allowed' : 'pointer'}} className={`moreB ${count === seatCount ? 'end' : ''}`} onClick={() => {if(count < seatCount) setCount(count + 1);}}>+</button>
                </div>
            </div>
        </div>
        <button onClick={() => <Link to={'/user/booking/'}></Link>}>Confirm</button>
       </>
    );
}

export default SeatSelection;