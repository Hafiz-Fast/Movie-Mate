import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import login from './js/Login';
import home from './js/Home';
import './css/home.css';
import './css/login.css';
import './UserApp.css';
import './AdminApp.css';

const RouteLogger = () => {
  const location = useLocation();

  const regex = /^\/(user|admin)/;
  const match = location.pathname.match(regex);

  console.log('Pathname:', location.pathname);
  console.log('match:', match)

  let type = match ? match[1] : null;

  if(type){
    sessionStorage.setItem('AccessType', type);
  }

  useEffect(() => {
    const body = document.querySelector('body');

    body.className = '';

    const access = sessionStorage.getItem('AccessType');

    console.log('AccessType from sessionStorage:', access);

    if(access === 'user' || location.pathname === '/login' || location.pathname === '/signup'){
      body.classList.add('user');
    }else if(access === 'admin'){
      body.classList.add('adm');
    }

    switch(location.pathname){

        case '/login':
        case '/signup':
            body.classList.add('login-page');
            login();
            break;
        case '/home':
            body.classList.add('home-page');
            home();
            break;
    }
  }, [location]);
  
return null;
};

export default RouteLogger;