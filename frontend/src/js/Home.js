import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [navVisible, setNavVisible] = useState(true);
    const prevScrollY = useRef(0);

    useEffect(() => {
        let lastHistoryState = window.history.state;

        const handlePopState = () => {
            const currentHistoryState = window.history.state;
            if(currentHistoryState.idx < lastHistoryState.idx){
                sessionStorage.clear();
                navigate('/login');
            }
            lastHistoryState = currentHistoryState;
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if(currentScrollY > prevScrollY.current){
                if (currentScrollY > 100) { // Only hide after 100px scroll
                    setNavVisible(false);
                }
            }else{
                setNavVisible(true);
            }

            if (currentScrollY < 10) {
                setNavVisible(true);
            }
            
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('scroll', handleScroll, { passive: true });

        document.body.classList.toggle('nav-visible', navVisible);
        document.body.classList.toggle('nav-hidden', !navVisible);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('nav-visible', 'nav-hidden');
        };
    }, [ navVisible ]);

    return null;
};

export default Home;