import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import MovieForm from './components/MovieForm';
import IMDBForm from './components/IMDBForm';
import DeleteMovieForm from './components/DeleteMovieForm';
import UpdateIMDbForm from './components/UpdateIMDb';

function App(){

  const[message, setMessage]=useState('');

  useEffect(()=>{
    fetch('http://localhost:5000')
    .then((response)=>response.text())
    .then((data)=>setMessage(data));
  },[]);

  return(
    <div style={{textAlign: 'center',marginTop: '50px'}}>
      <h1>React Frontend</h1>
      <p>{message}</p>
      <h1>Task Management</h1>
      <TaskForm />
      <TaskList />
      <h2>Enter Movie</h2>
      <MovieForm />
      <h2>Enter IMDb rating of Movie</h2>
      <IMDBForm />
      <br></br>
      <h2>Delete Movie</h2>
      <DeleteMovieForm />
      <br></br>
      <h2>Update IMDb Rating</h2>
      <UpdateIMDbForm />
      <br></br>
    </div>
  );
}

export default App;