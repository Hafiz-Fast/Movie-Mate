import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userType = 'Customer';
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, userType })
      });

      const data = await response.json();
        setMessage(data.message);
        setMessageColor(response.status === 201 ? 'green' : 'red');

        if (response.ok) {
          setEmail('');
          setUsername('');
          setPassword('');
          navigate('/login');
        }else if(!response.ok && data.errors){
          let errorMessages = '';
          data.errors.forEach(error => {
          errorMessages += `${error.msg}<br />`;
          });
          setMessage(errorMessages);
          setMessageColor('red');
        }
    }catch (error) {
      console.error('Error during signup:', error);
      setMessage('Network error or server down.');
      setMessageColor('red');
    }
  };

  return (
    <>
      <div className='Logging'>
        <img src='/logo.png' alt='Website Logo' className='LogoF'></img><br />
        <label>SignUp</label>
        <form onSubmit={handleSubmit} className='LogData'>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
          <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />

          <button type="submit">SignUp</button>
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

export default SignUp;