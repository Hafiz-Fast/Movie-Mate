import React , { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ScreeningDetail = () => {
    const { title } = useParams();
    const [futureShows, setFutureShows] = useState(false);
    const [Screenings, setScreeningDetails] = useState([]);
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    console.log(formattedDate);

    useEffect(() =>{
        const Details = async() =>{

            const response = await fetch("http://localhost:5000/api/search-screening", {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ MovieName: title })
            });

            const data = await response.json();
            
            setScreeningDetails(data);
            console.log("data:", data);
        };

        Details();
    }, [title]);

    return (
        <>
          {Screenings.length === 0 ? (
            <p>No Current Screenings</p>
          ) : (
            (() => {
              let hasTodayShows = false;
              let lastRenderedDate = "";
      
              const screeningsList = Screenings.map((show) => {
                const showDate = new Date(show.ShowDate);
                const formattedSDate = showDate.toLocaleDateString(undefined, options);
                let renderDateHeader = false;

                if (formattedSDate !== lastRenderedDate) {
                    // New date encountered
                    lastRenderedDate = formattedSDate;
                    renderDateHeader = true;
                }

                if (formattedDate === formattedSDate) {
                    hasTodayShows = true;
                }

                if (formattedDate === formattedSDate || futureShows) {
                    return (
                        <div key={`${show.ShowTiming}`}>
                            {renderDateHeader && (
                                <>
                                    <h3>{formattedSDate}</h3>
                                    <hr />
                                </>
                            )}
                            <div>
                                <p>{show.ScreenType} {show.ShowTiming}</p>
                            </div>
                        </div>
                    );
                }

                return null;
            });

            if (!hasTodayShows && !futureShows) {
                return <p>No Screenings today</p>;
            }

            return screeningsList;
        })()
    )}
    </>
    );
}

export default ScreeningDetail;