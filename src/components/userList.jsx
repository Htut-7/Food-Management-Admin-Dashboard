import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import "../css/UserList.css";

export default function UserList() {

    let {getUser}=useFirestore();
    let {error,loading, data:user}=getUser('users');

    if (error){
        return <p>{error}</p>
    }


  return (
    <div className='user'>
        <h2>Registered Users</h2>
    {loading && <p>Loading...</p>}
        <div className='user-list'>
            {user.map(u=>(
                <div className='single-user' key={u.id}>
                    <h4>Name: {u.name}</h4>
                    <span>Email: {u.email}</span>
                </div>
            ))}
        </div>
    </div>
  )
}
