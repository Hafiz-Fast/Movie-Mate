import React, {useState, useEffect} from 'react';
import SignUp from './components/SignUp';
import LoginU from './components/LoginU';
import LoginE from './components/LoginE';
import UpdatePass from './components/UpdatePass';
import Browse from './components/Browse';
import SearchMovie from './components/MovieSearch';
import ScreeningSearch from './components/Sscreening';
import Screening from './components/Screening';
import BookingMovie from './components/BookingMovie';

function App(){

  const[message, setMessage]=useState('');
  const [selectedForm, setSelectedForm] = useState('');

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
    .then((data)=>setMessage(data));
  },[]);

  console.log({message});

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value); // Update selectedForm when the dropdown changes
  };

  return(
    <div>
       <h1 class = 'M-Title'><span class = 'M-Style'>M</span>ovie<span class = 'M-Style'>M</span>ate</h1>
       <p>Welcome to MovieMate – Your go-to destination for the ultimate cinema experience.<br /> From the latest releases to upcoming hits, browse showtimes, book tickets, and enjoy personalized movie recommendations – all in one place.</p>

      <div>
        <select id="formSelector" name="formSelector" onChange={handleFormChange}>
          <option value="">--Select a form--</option>
          <option value="SignUp">SignUp</option>
          <option value="LoginE">Login using Email</option>
          <option value="LoginU">Login using Username</option>
          <option value="UpdatePass">Update Password</option>
          <option value="SearchMovie">Search the Movie</option>
          <option value="ScreeningSearch">Search Screening Times</option>
          <option value="BookMovie">Booking a Movie</option>
        </select>

        {/* Form 1 */}
        {selectedForm === 'SignUp' && <SignUp/>}

        {/* Form 2 */}
        {selectedForm === 'LoginE' && <LoginE/>}

        {/* Form 3 */}
        {selectedForm === 'LoginU' && <LoginU/>}

        {/*Form 4 */}
        {selectedForm === 'UpdatePass' && <UpdatePass/>}

        {/*Form 5*/}
        {selectedForm === 'SearchMovie' && <SearchMovie/>}

        {/*Form 6*/}
        {selectedForm === 'ScreeningSearch' && <ScreeningSearch/>}

        {/*Form 7*/}
        {selectedForm === 'BookMovie' && <BookingMovie/>}
      </div>
      <div>
        <Browse/>
      </div>
      <div>
        <Screening/>
      </div>
    </div>
  );
}

export default App;