import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const isEmail = (email) =>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const Login = () => {
    const [logD, setLogD] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('black');
    const navigate = useNavigate();
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        let response;
        try{
            if(isEmail(logD)){
                  response = await fetch('http://localhost:5000/api/login-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email:logD, password })
                  });            
            }else{
                  response = await fetch('http://localhost:5000/api/login-username', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username:logD, password })
                  });
            }
            const data = await response.json();

            const user = data.data[0];

            if (response.ok) {
                setMessage(data.message);
                setMessageColor('green');
                //store data for future use
                sessionStorage.setItem('UserID', user.UserID);
                sessionStorage.setItem('UserName', user.UserName);
                sessionStorage.setItem('Email', user.Email);
                //--------------------------------------------
                setLogD('');
                setPassword('');
                navigate('/home'); // Navigate to home
            }else if(!response.ok && data.errors){
                let errorMessages = '';
                data.errors.forEach(error => {
                errorMessages += `${error.msg}<br />`;
                });
                setMessage(errorMessages);
                setMessageColor('red');
            } 
        }
        catch(err){
            setMessage('An error occurred');
            setMessageColor('red');
        }
    };

    return(
        <>
            <div className='Logging'>
                <img src='/logo.png' alt='Website Logo' className='LogoF'></img>
                <form onSubmit={handleSubmit} className='LogData'>
                    <input type="text" placeholder="Enter email or username" value={logD} onChange={(e) => setLogD(e.target.value)} required /><br /><br />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                    <div style={{ marginTop: '1rem' }}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            {message && (
            <p
                style={{ color: messageColor }}
                dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </>
    );
};

export default Login;