import React, {useState, useEffect} from 'react';
import "./App.css"
import MovieForm from './components/MovieForm';
import IMDBForm from './components/IMDBForm';
import DeleteMovieForm from './components/DeleteMovieForm';
import UpdateIMDbForm from './components/UpdateIMDb';
import AddTheaterForm from './components/Theater';
import AddSeatRecord from './components/AddSeatRecord';
import AddShowTime from './components/AddShowTiming';
import AddPriceForm from './components/AddPrice';
import ShowMovies from './components/ShowMovies';
import TheaterList from './components/DisplayThaeters';
import ShowList from './components/DisplayShowTimings';
import Delete_seatrecord from './components/delete_seatrecord';
import Update_seatrecord from './components/update_seatrecord';
import DeleteShowTime from './components/delete_showtime_id';
import Update_showtimings from './components/Update_showtimings';
import Update_movie from './components/Update_movie';
import DeleteRating from './components/Delete_rating';
import Delete_theater from './components/Delete_theater';
import MenuBar from './components/MenuBar';



function App(){

  const[message, setMessage]=useState('');

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
    .then((data)=>setMessage(data));
  },[]);

  return(     
    <div style={{marginTop: '40px',marginLeft: '25px'}}>
        <MenuBar />
      <div class = "Title">
        Movie Mate
      </div>

      <div class = "Admin">
        Welcome back, Admin
        <p>Let’s add some Movies, Show Timings, IMDb Ratings, and Theaters to the spotlight!</p>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Enter Movie</h2>
        </div>
        <div class = "AddMovie-right">
          <MovieForm />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Enter IMDb Rating</h2>
        </div>
        <div class = "AddMovie-right">
          <IMDBForm />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Delete Movie</h2>
        </div>
        <div class = "AddMovie-right">
          <DeleteMovieForm />
        </div>
      </div>
      
      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Update IMDb Rating</h2>
        </div>
        <div class = "AddMovie-right">
          <UpdateIMDbForm />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Add Theater</h2>
        </div>
        <div class = "AddMovie-right">
          <AddTheaterForm />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Enter Seat Record for a Theater</h2>
        </div>
        <div class = "AddMovie-right">
          <AddSeatRecord />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Add ShowTime</h2>
        </div>
        <div class = "AddMovie-right">
          <AddShowTime />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Set Price for a Show</h2>
        </div>
        <div class = "AddMovie-right">
          <AddPriceForm />
        </div>
      </div>

      <div class = "DisplayMovie">
        <div class = "DisplayMovie-left">
          <h2>Movies</h2>
        </div>
        <div class = "DisplayMovie-right">
          <ShowMovies />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Theaters</h2>
        </div>
        <div class = "AddMovie-right">
          <TheaterList />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>MovieShows</h2>
        </div>
        <div class = "AddMovie-right">
          <ShowList />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Delete Seat Record</h2>
        </div>
        <div class = "AddMovie-right">
          <Delete_seatrecord />
        </div>
      </div>

      <div class = "AddMovie1">
        <div class = "AddMovie-left">
          <h2>Update Seat Record</h2>
        </div>
        <div class = "AddMovie-right">
          <Update_seatrecord />
        </div>
      </div>
      
      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Delete Show Time</h2>
        </div>
        <div class = "AddMovie-right">
          <DeleteShowTime />
        </div>
      </div>
      
      <div class = "AddMovie1">
        <div class = "AddMovie-left">
          <h2>Update Movie</h2>
        </div>
        <div class = "AddMovie-right">
          <Update_movie />
        </div>
      </div>

      
      <div class = "AddMovie1">
        <div class = "AddMovie-left">
          <h2>Update Show Timings</h2>
        </div>
        <div class = "AddMovie-right">
          <Update_showtimings />
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Delete Rating</h2>
        </div>
        <div class = "AddMovie-right">
          <DeleteRating/>
        </div>
      </div>

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Delete Theater</h2>
        </div>
        <div class = "AddMovie-right">
          <Delete_theater/>
        </div>
      </div>

    </div>

  );
}

export default App;