import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './js/Home';
import Movie from './js/Movie';
import './css/home.css';
import './css/login.css';
import './css/detail.css'
import './UserApp.css';
import './AdminApp.css';

const RouteLogger = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const regex = /^\/(user|admin)/;
  const match = location.pathname.match(regex);

  let type = match ? match[1] : null;

  if(type){
    sessionStorage.setItem('AccessType', type);
  } 

  useEffect(() => {
    const body = document.querySelector('body');

    body.className = '';

    const access = sessionStorage.getItem('AccessType');

    if(access === 'user' || location.pathname === '/login' || location.pathname === '/signup'){
      body.classList.add('user-mode');
      body.classList.add('user');
    }else if(access === 'admin'){
      body.classList.add('admin-mode');
      body.classList.add('adm');
    }

    if(location.pathname.startsWith('/user/movies/')){
      body.classList.add('detail-page');
    }
    
    switch(location.pathname){

        case '/login':
        case '/signup':
            body.classList.add('login-page');
            break;
        case '/user/home':
            body.classList.add('home-page');
            break;
        default:
            break;
            
    }
  }, [location, match, navigate]);
  
  if (location.pathname === '/user/home') {
    return <Home />;
  }else if(location.pathname === '/user/movies'){
    return <Movie />;
  }

return null;
};

export default RouteLogger;