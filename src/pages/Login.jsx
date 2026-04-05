import React, { useState } from 'react';
import "../css/Login.css";
import useSignin from '../hooks/useSignin';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {

    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');

    let {error,loading,signIn}=useSignin()

    const navigate=useNavigate();

    let loginUser=async(e)=>{
        e.preventDefault();
        let user=await signIn(email,password)

        if(user){
            navigate('/');
        }
    }

  

  return (
    <form className='login-form' onSubmit={loginUser}>
        <div className='loginform-container'>
            <h2>Login Form</h2>

            <div className='loginform-input'>
                <label>Email</label>
                <input type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <button type='submit' disabled={loading}>
                    {loading ? <span className='spinner'></span> : 'Login'}
                </button>

                <div className='link'>
                    <Link to='/register'>Dont'have an Account?</Link>
                </div>

                {error && <p className='error'>{error}</p>}
            </div>
        </div>
    </form>
  )
}
