import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

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

        if (response.status === 201) {
          setEmail('');
          setUsername('');
          setPassword('');
          setUserType('');
        }else if(!data.message && response.status === 400){
          let errorMessages = '';
          data.errors.forEach(error => {
          errorMessages += `${error.msg}<br />`;
          });
          setMessage(errorMessages);
          setMessageColor('red');
        }
        else {
        setMessage('Unexpected error occurred.');
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
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">-- Select User Type --</option>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
          <option value="Employee">Employee</option>
        </select>
        <br /> <br />
        <button type="submit">SignUp</button>
      </form>

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