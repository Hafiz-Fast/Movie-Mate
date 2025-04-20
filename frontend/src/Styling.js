import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import login from './js/Login';
import home from './js/Home';
import './css/home.css';
import './css/login.css';

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector('body');

    body.className = '';

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
        default:
          document.querySelector('body').style.backgroundImage = "url('')";
    }
  }, [location]);

  return null;
};

export default RouteLogger;