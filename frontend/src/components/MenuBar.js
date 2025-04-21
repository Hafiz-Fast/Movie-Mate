import React from 'react';

function MenuBar() {
  return (
    <nav className="menu-bar">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Add Movie</a></li>
        <li><a href="#">Theaters</a></li>
        <li><a href="#">Show Timings</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </nav>
  );
}

export default MenuBar;
