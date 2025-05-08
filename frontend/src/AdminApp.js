import React, {useEffect} from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
import AdmChangePass from './components/AmdChangePass';

function AppContent(){
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text());
    
    let email = '';
    const EData = sessionStorage.getItem('Email');
    
    if (EData){
      email = EData;
    }else {
      email = '';
    }


    const getAccess = async() => {
      const response = await fetch('http://localhost:5000/api/AccType', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if(data.data.length === 0 || data.data[0].UserType === 'Customer'){
        navigate('/');
      }

    }
    getAccess();
  },[navigate]);

  // Apply background images for different pages
  let className = '';
  if(location.pathname === '/admin'){
    className = 'home-background';
  }
  else if(location.pathname === '/admin/Theaters' || location.pathname === '/admin/Movies' || location.pathname === '/admin/Shows' || location.pathname === '/admin/Bookings' || location.pathname === '/admin/Users'){
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
          <li><Link to = "/admin">Home</Link></li>
          <li><Link to = "/admin/Movies">Movies</Link></li>
          <li><Link to = "/admin/Theaters">Theaters</Link></li>
          <li><Link to = "/admin/Shows">Shows</Link></li>
          <li><Link to = "/admin/Bookings">Bookings</Link></li>
          <li><Link to = "/admin/Users">Users</Link></li>
        </ul>
      </div>
      
      {/* Routes */}
      <Routes>
      
        {/* Home Router */}
        <Route path = "" element = {
          <div class = "Admin">
              Welcome back, Admin
              <p>Let’s add some Movies, Show Timings, IMDb Ratings, and Theaters to the spotlight!</p>
          </div>
        } />
        
        {/* Movies Router */}
        <Route path = "Movies" element = {
          <div>

          <div class = "AddMovie2">
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
            <h1>Movies</h1>
            <ShowMovies />
          </div>

          </div>
        } />

        {/* Theater Router */}
         <Route path = "Theaters" element = {
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

          <div class = "DisplayMovie">
            <h1>Theaters</h1>
            <TheaterList />
          </div>

          </div>
        } />

        {/* Shows Router */}
        <Route path = "Shows" element = {
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

             <div class = "DisplayMovie">
                <h1>Movie Shows</h1>
                <ShowList />
             </div>

          </div>
        } />

         {/* Bookings Router */}
         <Route path = "Bookings" element = {
          <div class = "DisplayMovie">
            <h1>Bookings</h1>
            <BookingList />
          </div>
        } />

        {/* Users Router */}
        <Route path = "Users" element = {
          <>
            <div class = "AddMovie">
              <div class = "AddMovie-left">
                <h2>Reset Password</h2>
              </div>
              <div class = "AddMovie-right">
                <AdmChangePass />
              </div>
            </div>
            <div class = "DisplayMovie">
              <h1>Users</h1>
              <UserList />
            </div>
          </>
        } />

      </Routes>

      </div>
    </div>
  );
}

function App(){
  return(
    <>
      <AppContent />
    </>
  )
}

export default App;