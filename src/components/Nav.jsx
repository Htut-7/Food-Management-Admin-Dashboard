import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import "../css/Nav.css";
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Nav() {

    let {logOut}=useLogout();
    const navigate=useNavigate();

    let {user}=useContext(AuthContext);

    let logoutUser=async()=>{
            await logOut();
             navigate('/login');
    }
    
  return (
    <nav className='navbar'>
        <h2>Admin Dashboard</h2>
        <div className='nav-container'>
            <ul className='nav-links'>
                <NavLink to='/'>Dashboard</NavLink>
                <NavLink to='/foods'>Foods</NavLink>
                <NavLink to='/create'>Add Food</NavLink>
                <NavLink to='/users'>Users</NavLink>
            </ul>

            <div className='nav-control'>
               {!! user &&<Link onClick={logoutUser}>Logout</Link>}
                {!user && 
                    <>
                    <Link>Login</Link>
                <Link>Register</Link>
                        </>
                }
            </div>
        </div>
    </nav>
  )
}
