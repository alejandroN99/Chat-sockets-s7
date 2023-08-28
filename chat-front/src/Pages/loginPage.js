import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();
  const usernameRef = React.createRef();
  const passwordRef = React.createRef(); 

  const loginUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios.post('http://localhost:8080/user/login', {
        username,
        password
    }).then( (response) => {
      makeToast('success', response.data.msg);
      navigate('/main');
    }).catch( (err) => {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
      makeToast("error", err.response.data.msg);
    })


  }
    return (
        <div className='card'>
          <div className='cardHeader'>Login</div>
          <div className='cardBody'>
            <div className='inputGroup'>
              <label htmlFor='name'>Name</label>
              <input 
              type='text' 
              name='name' 
              id='name' 
              placeholder='Alejandro'
              ref= {usernameRef}
              />
            </div>
            <div className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input 
              type='password' 
              password='password' 
              id='password' 
              placeholder='Your password'
              ref= {passwordRef}
              />
            </div>
          </div>
          <button onClick={loginUser}>Login</button>
        </div>
      );
    
};

export default LoginPage;