import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector('body');

    switch(location.pathname){

        case '/login':
        case '/signup':
            body.style.backgroundImage = "url('/BLogoLS2.png')";
            body.style.backgroundPosition = 'center';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = 'cover';
            break;
        case '/home':
            body.style.backgroundImage = "url('/BLogoLS.png')";
            body.style.backgroundPosition = 'center';
            body.style.backgroundRepeat = 'no-repeat';
            body.style.backgroundSize = "100%";
            body.style.backgroundAttachment = 'fixed';
            break;
    }
  }, [location]);

  return null;
};

export default RouteLogger;