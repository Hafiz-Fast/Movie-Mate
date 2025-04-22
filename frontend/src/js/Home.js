import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

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

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return null;
};

export default Home;