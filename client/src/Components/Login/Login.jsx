/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './Login.css';
import { FaUser,FaLock } from "react-icons/fa6";
import { signInWithEmailAndPassword} from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const Navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // eslint-disable-next-line no-unused-vars
    const [errorMessage,setErrorMessage]=useState('');


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const userCredential=await signInWithEmailAndPassword(auth,email,password);
          console.log(userCredential);
          const user=userCredential.user;
          console.log(user);
          localStorage.setItem('token',user.accessToken);
          localStorage.setItem('user',JSON.stringify(user));
          Navigate(`/${user.uid}`);
        }
        catch(error){
          toast('Invalid credentials');
          setErrorMessage(error.message);
        }
      }


  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
              {/* Email input */}
            <div className="input-box">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
              />   
              <FaUser className='icon'/>          
            </div>

            {/* Password input */}
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />   
              <FaLock className='icon'/>
            </div>

          {/* Login button */}
            <button type="submit">
              Login
            </button>
            
            {/* Register link */}
            <div>
            <p className="register-link">
              Dont have an account?
              <a to="/register">
                Register
              </a>
            </p>
            </div>
        </form>
    </div>
    <ToastContainer/>
    </>    
  )
}

export default Login