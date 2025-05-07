import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RouteLogger from './Styling';

import UserApp from './UserApp';
import AdminApp from './AdminApp';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {

  return (
    <Router>
      <RouteLogger />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/*" element={<UserApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;