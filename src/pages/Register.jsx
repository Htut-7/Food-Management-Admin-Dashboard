import React from 'react';
import { useState } from 'react';
import "../css/Register.css";
import useSignup from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {

    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');

    let {error,loading,signUp}=useSignup();
    
    const navigate=useNavigate();

    if(error){
        return <p>{error}</p>
    }


    let registerUser=async(e)=>{
        e.preventDefault();
        let user=await signUp(email,password)

        if(user){
            navigate('/login')
        }
    }

  return (
    <form className='reg-form' onSubmit={registerUser}>
        <div className='form-container'>
            <h2>Register Here...</h2>

            <div className='regform-input'>

                <label>Name</label>
                <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Email</label>
                <input type='email' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <button type='submit' disabled={loading}>
                    {loading ? <span className='spinner'></span> : "Register"}
                </button>

                <div className='account-link'>
                    <Link to='/login'>Already have an Account?</Link>
                </div>
            </div>
        </div>
    </form>
  )
}
