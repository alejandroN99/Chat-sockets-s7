import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const nameRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = () => {

        const username = nameRef.current.value;
        const password = passwordRef.current.value;

        axios.post('http://localhost:8080/user/register', {
            username,
            password
        }).then( (response) => {
            makeToast('success', response.data.msg);
            navigate("/login");

        }).catch((err) => {
            if (err && err.response && err.response.data && err.response.data.msg){
            makeToast("error", err.response.data.msg);
            }
          });

    }
    
    return (
        <div className='card'>
          <div className='cardHeader'>Register</div>
          <div className='cardBody'>
            <div className='inputGroup'>
              <label htmlFor='name'>Name</label>
              <input 
              type='text' 
              username='name' 
              id='name' 
              placeholder='Alejandro'
              ref = {nameRef}
              />
            </div>
            <div className='inputGroup'>
              <label htmlFor='password'>Password</label>
              <input 
              type='password' 
              password='password' 
              id='password' 
              placeholder='Your password'
              ref = {passwordRef}
              />
            </div>
          </div>
            <button onClick={registerUser}>Register</button>
          
        </div>
    )
};

export default RegisterPage;