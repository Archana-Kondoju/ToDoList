// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaLock, FaUser } from 'react-icons/fa6';
import './Login.css'
const Register = () => {
    const Navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // eslint-disable-next-line no-unused-vars
    const [errorMessage,setErrorMessage]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const userCredential=await createUserWithEmailAndPassword(auth,email,password);
          console.log(userCredential);
          const user=userCredential.user;
          localStorage.setItem('token',user.accessToken);
          localStorage.setItem('user',JSON.stringify(user));
          Navigate(`/${user.uid}`);
        }
        catch(error){
          toast('Email already in use! Please Login.');
          setErrorMessage(error.message);
        }
      }


      return (
        <>
          <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
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

          {/* Register button */}
            <button type="submit">
              Register
            </button>
            
            {/* Login link */}
            <div>
            <p className="register-link">
              Already have an account?
              <a to="/login">
                Login
              </a>
            </p>
            </div>
        </form>
    </div>
    <ToastContainer/>
    </>    
  )
}

export default Register
