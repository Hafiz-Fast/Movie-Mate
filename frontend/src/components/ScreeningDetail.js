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
    const [isRunning, setIsRunning] = useState(false);
    const timeoutRef = useRef(null);

    const handleToggle = () =>{
        setFutureShows(prev => !prev);
    };

    const fetchScreeningDetails = async () => {
        try {
            console.log("FetchScreening:",selectedScreen);
            const response = await fetch("http://localhost:5000/api/search-screening", {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ MovieName: title })
            });
            const data = await response.json();
            setScreeningDetails(data);
            if (todayDivRef.current) {
                setTodayHeight(`${todayDivRef.current.scrollHeight}px`);
                setMaxHeight(`${todayDivRef.current.scrollHeight}px`);
            }

            checkDataOnCleanUp(data);
        } catch (error) {
            console.error("Error fetching screenings:", error);
        }
    };

    const checkDataOnCleanUp = ({ newScreening }) => {
        console.log("Checking my choice");
        console.log('Data:',selectedScreen);
        if (selectedScreen) {
            console.log("Choice exists");
            const stillExists = newScreening.some(screen =>
                screen.ShowTiming === selectedScreen.ShowTiming &&
                screen.ScreenType === selectedScreen.ScreenType
            );
            if (!stillExists) {
                console.log("Removing the Screening");
                setSelectedScreen(null);
            }
            console.log("Choice reset");
        }
    };

    const fetchMovieDetails = async () => {
        try {
            console.log("FetchMoveScreen:",selectedScreen);
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
    };

    const scheduleNextCleanup = async () => {
        const now = Date.now();
        const msUntilNext5Min = 300000 - (now % 300000) + 2000; // Next 5-minute mark + 1s buffer

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); // Clear the previous timeout if it exists
        }

        setTimeout(async () => {
            if (!isRunning) {
                console.log("Timeout:",selectedScreen);
                setIsRunning(true);
                await fetchScreeningDetails(); // Fetch new data
                setIsRunning(false);
                scheduleNextCleanup(); // Schedule next fetch
            } else {
                console.log("Previous fetch is still running, skipping this interval.");
                scheduleNextCleanup(); // Keep scheduling, but don't run if still fetching
            }
        }, msUntilNext5Min);
    };

    useEffect(() => {
        fetchMovieDetails(); // Fetch movie details once on mount

        fetchScreeningDetails(); // Fetch screening details on mount
        scheduleNextCleanup(); // Schedule subsequent data fetches

        return() => {
            if(timeoutRef.current)
            clearTimeout(timeoutRef.current);
        }
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