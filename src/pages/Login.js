import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../components/utils/loginAuth';

export default function Login() {
  const [userDetails, setUserDetails] = useState({ name: '', password: '' });
  const auth = useAuth();
  const navigateToHome = useNavigate();

  // Handle login
  const handleLogin = () => {
    if(auth.authenticateUser(userDetails.name, userDetails.password)){
      navigateToHome('/');
    } else {
      alert('Please enter correct username and password!');
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <div className='input-container'>
          <span className='label'>Username</span>
          <input placeholder='Enter username' type='text'
            onChange={(event) => setUserDetails({ ...userDetails, name: event.target.value })}
          />
        </div>
        <div className='input-container'>
          <span className='label'>Password</span>
          <input placeholder='Enter password' type='password'
            onChange={(event) => setUserDetails({ ...userDetails, password: event.target.value })}
          />
        </div>
        <button className='login-btn' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
