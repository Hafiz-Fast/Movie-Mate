import React , { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
    const [isRunning, setIsRunning] = useState(false);
    const timeoutRef = useRef(null);

    const handleToggle = () =>{
        setFutureShows(prev => !prev);
    };

    const fetchScreeningDetails = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/search-screening", {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ MovieName: title })
            });
            const data = await response.json();
            setScreeningDetails(data);
            
            if (todayDivRef.current) {
                const height = todayDivRef.current.scrollHeight;
                setTodayHeight(`${height}px`);
                setMaxHeight(`${height}px`);
            }
            else{
                setTodayHeight('150px');
                setMaxHeight('150px');                
            }

        } catch (error) {
            console.error("Error fetching screenings:", error);
        }
    }, [title]);

    const fetchMovieDetails = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:5000/api/search-movie", {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ MovieName: title })
            });
            const data = await response.json();
            setMovie(data[0]);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }, [title]);

    const scheduleNextCleanup = useCallback(async () => {
        const now = Date.now();
        const msUntilNext5Min = 300000 - (now % 300000) + 2000; // Next 5-minute mark + 1s buffer

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear the previous timeout if it exists
        }

        setTimeout(async () => {
            if (!isRunning) {
                setIsRunning(true);
                await fetchScreeningDetails(); // Fetch new data
                setIsRunning(false);
                scheduleNextCleanup(); // Schedule next fetch
            } else {
                console.log("Previous fetch is still running, skipping this interval.");
                scheduleNextCleanup(); // Keep scheduling, but don't run if still fetching
            }
        }, msUntilNext5Min);
    },[isRunning, fetchScreeningDetails]);

    useEffect(() => {
        
        if (!selectedScreen) {
            setSelectedScreen(null);
        }
    }, [selectedScreen]);

    useEffect(() => {
        fetchMovieDetails(); // Fetch movie details once on mount

        fetchScreeningDetails(); // Fetch screening details on mount
        scheduleNextCleanup(); // Schedule subsequent data fetches

        const currentTimeout = timeoutRef.current;

        return() => {
            if(currentTimeout)
            clearTimeout(currentTimeout);
        }
    }, [title, fetchMovieDetails, fetchScreeningDetails, scheduleNextCleanup]);

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

                return (
                    <>
                        {!hasTodayShows && (
                        <>
                            <div className='Detail'>
                                <h3>{formattedDate}</h3>
                                <div className="displayD" tabIndex="0" onClick={handleToggle}>
                                        {futureShows ? "Hide Future Shows" : "Show Future Shows"}
                                    <span className={`arrow ${futureShows ? 'up' : ''}`}>&#x25BC;</span>
                                </div>
                            </div>
                            <hr />
                            <h1 style={{ textAlign: 'center', margin: '3rem 0' }}>No Present Screening</h1>
                        </>
                        )}
                        {Object.entries(groupByDate).map(([date, shows]) => {
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
                                        <a href='#seatSelection' style={{ textDecoration: 'none', color: 'inherit', marginTop: '1vh' }}  key={`${show.ShowTiming}-${show.ScreenType}`}>
                                            <div className={`show-card ${selectedScreen?.ShowTiming === show.ShowTiming ? "selected" : ""}`}
                                                tabIndex='0' onClick={() => setSelectedScreen(prev => prev?.ShowTiming === show.ShowTiming && prev?.ScreenType === show.ScreenType ? null : show)} role="button"
                                                aria-pressed={selectedScreen?.ShowTiming === show.ShowTiming}>
                                            <p className={`badge ${show.ScreenType}`}>{show.ScreenType}</p>
                                            <p>{show.ShowTiming}</p>
                                            </div>
                                        </a>
                                    ))}
                                    </div>

                                </div>
                            );
                        })}
                    </>
                );
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