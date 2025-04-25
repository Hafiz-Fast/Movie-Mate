import { useEffect, useState, useRef } from 'react';

const Movie = () => {
    const [navVisible, setNavVisible] = useState(true);
    const prevScrollY = useRef(0);

    useEffect(() => {

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

        window.addEventListener('scroll', handleScroll, { passive: true });

        document.body.classList.toggle('nav-visible', navVisible);
        document.body.classList.toggle('nav-hidden', !navVisible);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('nav-visible', 'nav-hidden');
        };
    }, [ navVisible ]);

    return null;
};

export default Movie;