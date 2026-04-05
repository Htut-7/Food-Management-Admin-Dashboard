import React from 'react';
import { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { useEffect } from 'react';
import { getDoc,doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import {  } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import "../css/FoodForm.css";

export default function FoodForm() {

    let {addCollection,updateCollection}=useFirestore();

    let [name,setName]=useState('');
    let [price,setPrice]=useState('');
    let [newCategory,setNewCategory]=useState('');
    let [image,setImage]=useState('');
    let [description,setDescription]=useState('');
    let [category,setCategory]=useState([]);
    let [isEdit,setIsEdit]=useState('');

    const {id}=useParams();

    useEffect(()=>{
        if(id){
            setIsEdit(true);
            let ref=doc(db,'food',id)
            getDoc(ref).then(docs=>{
                if(docs.exists()){
                    let {name,price,category,image,description}=docs.data();
                    setName(name);
                    setPrice(price)
                    setCategory(category);
                    setImage(image);
                    setDescription(description);
                }
                else{
                    setName('');
                    setPrice('');
                    setCategory('');
                    setImage('');
                    setDescription('');
                    setCategory([]);
                }
            })
        }
    },[id])

    let navigate=useNavigate();

    let addCategory=()=>{
       if(newCategory && category.includes(newCategory)){
        setNewCategory('')
        return
       }
       setCategory(prev=>[newCategory,...prev]);
       setNewCategory('');
    }

    let {user}=useContext(AuthContext);

    let addFood=async(e)=>{
        e.preventDefault();
        let data={
            name,
            price,
            category,
            image,
            description,
            uid:user.uid
        }
        if(isEdit){
            await updateCollection('food',id,data)
        }
        else{
            await addCollection('food',data)
        }
        navigate('/foods')
    }

  return (
    <form className='foodform' onSubmit={addFood}>
        <div className='form-container'>
            <h2>Add New Food</h2>

            <div className='form-input'>
                <label>Dish Name</label>
                <input type='text' placeholder='Enter the Dish' onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Dish Price</label>
                <input type='number' placeholder='Enter Dish Price' onChange={(e)=>setPrice(e.target.value)} value={price}/>

                <div className='catg'>
                    <label>Dish Category</label>
                    <input type='text' placeholder='Enter Dish Category' onChange={(e)=>setNewCategory(e.target.value)} value={newCategory}/>
                    <button type='button' onClick={addCategory}>+</button>
                </div>

                 <div className='detail-catg'>
                        {category?.map(c=>(
                            <span key={c}>{c}</span>
                        ))}
                    </div>

                <label>Dish Image</label>
                <input type='text' placeholder='Enter Dish Image URL' onChange={(e)=>setImage(e.target.value)} value={image}/>
               {!! image &&<img src={image}/>}

                <label>Description</label>
                <textarea placeholder='Write Description here' onChange={(e)=>setDescription(e.target.value)} value={description}/>

                <button type='submit'>{isEdit ? 'Update': 'Create'}</button>
            </div>
        </div>
    </form>
  )
}
