import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
import BookingList from './components/DisplayBookings';
import UserList from './components/DisplayUsers';

function AppContent(){
  const location = useLocation();

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
  },[]);

  // Apply background images for different pages
  let className = '';
  if(location.pathname === '/'){
    className = 'home-background';
  }
  else if(location.pathname === '/Theaters' || location.pathname === '/Movies' || location.pathname === '/Shows' || location.pathname === '/Bookings' || location.pathname === '/Users'){
    className = 'theater-background';
  }
  else{
    className = '';
  }

  return(
    <div class={className}>
      <div style={{marginTop: '40px',marginLeft: '25px'}}>
      <div class = "Title">
        Movie Mate
      </div>

      <div class = "Nav">
        <ul>
          <li><Link to = "/">Home</Link></li>
          <li><Link to = "/Movies">Movies</Link></li>
          <li><Link to = "/Theaters">Theaters</Link></li>
          <li><Link to = "/Shows">Shows</Link></li>
          <li><Link to = "/Bookings">Bookings</Link></li>
          <li><Link to = "/Users">Users</Link></li>
        </ul>
      </div>
      
      {/* Routes */}
      <Routes>
      
        {/* Home Router */}
        <Route path = "/" element = {
          <div class = "Admin">
              Welcome back, Admin
              <p>Let’s add some Movies, Show Timings, IMDb Ratings, and Theaters to the spotlight!</p>
          </div>
        } />
        
        {/* Movies Router */}
        <Route path = "/Movies" element = {
          <div>

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
              <h2>Delete Movie</h2>
            </div>
            <div class = "AddMovie-right">
               <DeleteMovieForm />
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
              <h2>Update IMDb Rating</h2>
            </div>
            <div class = "AddMovie-right">
              <UpdateIMDbForm />
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

          </div>
        } />

        {/* Theater Router */}
         <Route path = "/Theaters" element = {
          <div>

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
               <h2>Theaters</h2>
             </div>
             <div class = "AddMovie-right">
               <TheaterList />
             </div>
          </div>

          </div>
        } />

        {/* Shows Router */}
        <Route path = "/Shows" element = {
          <div>

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
                 <h2>MovieShows</h2>
               </div>
               <div class = "AddMovie-right">
                 <ShowList />
               </div>
             </div>

          </div>
        } />

         {/* Bookings Router */}
         <Route path = "/Bookings" element = {
          <div class = "AddMovie">
            <div class = "AddMovie-left">
              <h2>Bookings</h2>
            </div>
            <div class = "AddMovie-right">
              <BookingList />
            </div>
          </div>
        } />

        {/* Users Router */}
        <Route path = "/Users" element = {
          <div class = "AddMovie">
            <div class = "AddMovie-left">
              <h2>Users</h2>
            </div>
            <div class = "AddMovie-right">
              <UserList />
            </div>
          </div>
        } />

      </Routes>

      </div>
    </div>
  );
}

function App(){
  return(
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;