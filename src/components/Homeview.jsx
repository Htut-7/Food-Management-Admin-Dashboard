import React from 'react';
import Chart from '../components/Chart';
import "../css/Homeview.css";
import useFirestore from '../hooks/useFirestore';

export default function Homeview() {

  let {getUser}=useFirestore();
  let{error,loading,data:users}=getUser('users');

  if(error){
    return <p>{error}</p>
  }

  if(loading){
    return(
      <div className='loading-container'>
        <div className='spinner'>
          <p>Loading...</p>
        </div>
      </div>
    )
   
  }

  return (
    <div className='home'>
      <h2>Dashboard</h2>

      <div className="cards">

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/128/1046/1046784.png" alt="food" />
          <div>
            <h3>Total Foods</h3>
            <p>120</p>
          </div>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt="users" />
          <div>
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/128/2921/2921222.png" alt="category" />
          <div>
            <h3>Categories</h3>
            <p>12</p>
          </div>
        </div>

        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/128/263/263142.png" alt="orders" />
          <div>
            <h3>Orders</h3>
            <p>30</p>
          </div>
        </div>

      </div>

      <div className="chart-section">
        <h3>Monthly Overview</h3>
        <Chart />
      </div>

      <div className="recent">
        <h3>Recent Activities</h3>
        <ul>
          <li>New user registered</li>
          <li>Pizza added to menu</li>
          <li>Category "Drinks" created</li>
          <li>Order #102 placed</li>
        </ul>
      </div>
    </div>
  );
}