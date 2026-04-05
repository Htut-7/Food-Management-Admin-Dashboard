import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import "../css/Foodlist.css"
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function Foodlist() {

    let {user}=useContext(AuthContext)

    let {getCollection,deleteDocument}=useFirestore()
    let {error,loading,data:food}=getCollection('food',['uid','==',user.uid]);

      let deleteFood=async(e,id)=>{
        e.preventDefault();
        await deleteDocument('food',id)
    }

    if(error){
        return <p>{error}</p>
    }

  return (
    <div className='foods'>
      <h2>Food Management</h2>
      {loading && <p>Loading...</p>}

{  <div className='food-container'>
    {food.map(f=>(
        <div key={f.id} className='single-food'>
        <img src={f.image} alt={f.name}/>
        <h3>{f.name}</h3>
        <p>Price: {f.price}</p>

        <div className='f-catg'>
            {f.category?.map(c=>(
            <span key={c}>{c}</span>
            ))}
        </div>

        <div className='food-btn'>
            <Link to={`/fooddetail/${f.id}`}>Detail</Link>
            <button type='button' onClick={(e)=>deleteFood(e,f.id)}>Delete</button>
            <Link to={`/edit/${f.id}`}>Update</Link>
        </div>
        </div>
    ))}
    </div>}
    </div>
  )
}
