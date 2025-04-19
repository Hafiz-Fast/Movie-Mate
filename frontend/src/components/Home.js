import React , { useState, useEffect } from 'react';

const Home = () => {
    const [userInfo, setUserInfo] = useState({
        id: '',
        username: '',
        email: ''
      });
    
      useEffect(() => {
        setUserInfo({
          id: sessionStorage.getItem('UserID'),
          username: sessionStorage.getItem('UserName'),
          email: sessionStorage.getItem('Email')
        });
      }, []);

    return(
        <>
            <h1>UserID</h1>
            <h2>{userInfo.id}</h2>
            <h1>Username</h1>
            <h2>{userInfo.username}</h2>
            <h1>Email</h1>
            <h2>{userInfo.email}</h2>
        </>
    );
};

export default Home;