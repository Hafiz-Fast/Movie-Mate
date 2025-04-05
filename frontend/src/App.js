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

function App(){

  const[message, setMessage]=useState('');

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
    .then((data)=>setMessage(data));
  },[]);

  return(
    <div style={{marginTop: '40px',marginLeft: '25px'}}>
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

      <div class = "AddMovie">
        <div class = "AddMovie-left">
          <h2>Movies</h2>
        </div>
        <div class = "AddMovie-right">
          <ShowMovies />
        </div>
      </div>

    </div>
  );
}

export default App;