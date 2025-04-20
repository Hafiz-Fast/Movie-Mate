import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import login from './js/Login';
import home from './js/Home';

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector('body');

    switch(location.pathname){

        case '/login':
        case '/signup':
            login();
            break;
        case '/home':
            home();
            break;
        default:
          document.querySelector('body').style.backgroundImage = "url('')";
    }
  }, [location]);

  return null;
};

export default RouteLogger;