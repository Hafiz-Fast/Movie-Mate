import React, {useState, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RouteLogger from './Styling';
import Home from './components/Home';

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
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path="/home" element={<Home />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </>
  );
}

export default App;