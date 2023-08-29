import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate = useNavigate();
  const usernameRef = React.createRef();
  const passwordRef = React.createRef(); 

  const alreadyRegisterUser = () => {
    navigate("/register");
  }

  const loginUser = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios.post('http://localhost:8080/user/login', {
        username,
        password
    }).then( (response) => {
      makeToast('success', response.data.msg);
      localStorage.setItem('CU_Token', response.data.token);

      navigate("/chatroom");

    }).catch( (err) => {
      if (err && err.response && err.response.data && err.response.data.msg){
        makeToast("error", err.response.data.msg);
      }
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
          <div className='buttonGroup'>
            <button onClick={loginUser}>Login</button>
            <button onClick={alreadyRegisterUser}>Go register</button>
          </div>
        </div>
      );
    
};

export default LoginPage;