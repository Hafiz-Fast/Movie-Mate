import React , { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import SeatSelection from './SeatSelection';

const ScreeningDetail = () => {
    const { title } = useParams();
    const [futureShows, setFutureShows] = useState(false);
    const [Screenings, setScreeningDetails] = useState([]);
    const [Movie, setMovie] = useState([]);
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    const todayRef = useRef(null);
    const todayDivRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [todayHeight, setTodayHeight] = useState('0px');
    const [selectedScreen, setSelectedScreen] = useState(null);

    const handleToggle = () =>{
        setFutureShows(prev => !prev);
    }

    useEffect(() =>{
        const Details = async() =>{

            let response = await fetch("http://localhost:5000/api/search-screening", {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ MovieName: title })
            });

            let data = await response.json();
            
            setScreeningDetails(data);

            response = await fetch("http://localhost:5000/api/search-movie", {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ MovieName: title })
            });

            data = await response.json();
            
            setMovie(data[0]);

            if (todayDivRef.current) {
                setTodayHeight(`${todayDivRef.current.scrollHeight}px`);
                setMaxHeight(`${todayDivRef.current.scrollHeight}px`);
            }
        };

        Details();
    }, [title]);

    useEffect(() => {
        const element = todayRef.current;
        if (!element){ return;}
    
        
        if (futureShows) {
            const scrollHeight = element.scrollHeight;
            setMaxHeight(`${scrollHeight}px`);
        } else {
            setMaxHeight(todayHeight);  // Collapse to today's height
        }
    },[futureShows, todayHeight]);

    return (
        <>
        <h1 style={{ fontSize: '300%', textAlign: 'center' }}>{Movie.Title}</h1>
         <img src={Movie.links} alt={title} style={{ width: "25%", display: 'block', marginLeft: 'auto', marginRight: 'auto' }}></img>
         <div ref={todayRef} className={"showing-container"} style={{ '--max-height': maxHeight }}>
          {Screenings.length === 0 ? (
            <p>No Current Screenings</p>
          ) : (
            (() => {
              let hasTodayShows = false;
              const groupByDate = {};

              Screenings.forEach(show => {
                const showDate = new Date(show.ShowDate);
                const formattedSDate = showDate.toLocaleDateString(undefined, options);
                
                if(!groupByDate[formattedSDate]){
                    groupByDate[formattedSDate] = [];
                }
                groupByDate[formattedSDate].push(show);

                if (formattedDate === formattedSDate) {
                    hasTodayShows = true;
                }
                });

                if (!hasTodayShows && !futureShows) {
                    return <p>No Screenings today</p>;
                }

                return Object.entries(groupByDate).map(([date, shows]) => {
                    return (
                        <div key={date} ref={ date === formattedDate ? todayDivRef : null }>
                          <div className='Detail'>
                            <h3>{date}</h3>
                            {date === formattedDate && (
                              <div className="displayD" tabIndex="0" onClick={handleToggle}>
                                    {futureShows ? "Hide Future Shows" : "Show Future Shows"}
                                <span className={`arrow ${futureShows ? 'up' : ''}`}>&#x25BC;</span>
                              </div>
                            )}
                          </div>
                          <hr />

                          <div className='times' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: 0}}>
                            {shows.map(show => (
                                <a href='#seatSelection' style={{ textDecoration: 'none', color: 'inherit' }}  key={show.ShowTiming}>
                                    <div className="show-card" tabIndex='0' onClick={() => setSelectedScreen(prev => prev?.ShowTiming === show.ShowTiming ? null : show)}>
                                    <p className={`badge ${show.ScreenType}`}>{show.ScreenType}</p>
                                    <p>{show.ShowTiming}</p>
                                    </div>
                                </a>
                            ))}
                            </div>

                        </div>
                    );
                });
        })()
    )}
    </div>
    {selectedScreen && (
        <div id="seatSelection">
            <SeatSelection selectedScreen={selectedScreen}/>
        </div>
    )}
    </>
    );
}

export default ScreeningDetail;