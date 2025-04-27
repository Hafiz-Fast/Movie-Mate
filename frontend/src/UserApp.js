import React, {useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail';
import ScreeningDetail from './components/ScreeningDetail';
import SeatSelection from './components/SeatSelection';

function App(){

  const[message, setMessage]=useState('');

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
    .then((data)=>setMessage(data));
  },[]);

  console.log({message});

  return(
    <>
      <Routes>
        <Route path='/' element={<Navigate to='home' />} />
        <Route path="home" element={<Home />} />
        <Route path='movies' element={<Movies />} />
        <Route path="movies/:title" element={<MovieDetail />} />
        <Route path='booking/:title' element={<ScreeningDetail />} />
        <Route path='booking/:title/seats' element={<SeatSelection />} />
      </Routes>
    </>
  );
}

export default App;