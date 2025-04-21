import React from 'react';
import { Link } from 'react-router-dom';
function MenuBar() {
  return (
    <nav className="menu-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-movie">Add Movie</Link></li>
        <li><Link to="/delete_movie">Delete Movie</Link></li>
        <li><Link to="/update_movie">Update Movie</Link></li>
        <li><Link to="/display_movie">Display</Link></li>
      </ul>
    </nav>
  );
}

export default MenuBar;
