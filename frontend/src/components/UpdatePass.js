import React, { useState } from 'react';

const UpdatePass = () => {
    const [email, setEmail] = useState('');
    const [oPass, setOPass] = useState('');
    const [nPass, setNPass] = useState('');
    const[message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('black');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/update-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email, oPass, nPass})
            });

            const data = await response.json();

            setMessage(data.message);
            setMessageColor(response.ok ? 'green' : 'red');
            
            if(response.ok){
                setEmail('');
                setOPass('');
                setNPass('');  
            }else if(response.status === 400 && !data.message){
                let errorMessages = '';
                data.errors.forEach(error => {
                errorMessages += `${error.msg}<br />`;
                });
                setMessage(errorMessages);
                setMessageColor('red');
            }
        }catch(error){
            console.error('Error during signup:', error);
            setMessage('Network error or server down.');
            setMessageColor('red');
        }
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/><br /><br />
                <input type='password' placeholder='Old Pass' value={oPass} onChange={(e) => setOPass(e.target.value)} required /><br /><br />
                <input type='password'placeholder='New Pass' value={nPass} onChange={(e) => setNPass(e.target.value)} required /><br /><br />
                <button type='submit'>Change Password</button>
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
export default UpdatePass;