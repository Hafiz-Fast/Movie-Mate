import React , { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const SeatSelection = ({selectedScreen}) => {
    const [seatCount, setSeatCount] = useState(0);
    const [count, setCount] = useState(0);
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
                console.log("Seat Count:", seatCount);
            }
            catch(error){
                console.error("Error receiving data");
            }
        };
        seats();
    },[selectedScreen]);

    return(
        <>
        <br />
        <div style={{ display: 'flex', gap: '50vw', border:'2px solid white', paddingTop: '5vh', paddingBottom: '5vh' }}>
            <h2 style={{ paddingLeft: '3vw' }}>Tickets</h2>
            <div style={{ backgroundColor: 'white', borderRadius: "8px"}}>
                <div style={{ display: "flex", alignItems: "center", gap: 0, fontSize: 0 }}>
                    <button style={{ cursor: count === 0 ? 'not-allowed' : 'pointer'}} className={`lessB ${count === 0  ? 'start' : ''}`} onClick={() => {if(count > 0) setCount(count - 1);}}>-</button>
                    <div style={{padding:'1vh 2vw', backgroundColor: 'white', color: 'black', fontSize: '1rem' }}>{count}</div>
                    <button style={{ cursor: count === seatCount ? 'not-allowed' : 'pointer'}} className={`moreB ${count === seatCount ? 'end' : ''}`} onClick={() => {if(count < seatCount) setCount(count + 1);}}>+</button>
                </div>
            </div>
        </div>
        <button onClick={() => <Link to={`/user`}></Link>}>Confirm</button>
       </>
    );
}

export default SeatSelection;