import React, { useEffect } from 'react';
import { useState } from 'react';
import "../css/Comment.css";
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';

export default function Comment({type='create',setEditNote,editNote}) {

    let [name,setName]=useState('');
    let [body,setBody]=useState('');
     const {id}=useParams();
   
     let {addCollection,updateCollection}=useFirestore();

     useEffect(()=>{
        if(type==='update' && editNote){
            setBody(editNote.body);
            setName(editNote.name);
        }
     },[type,editNote])
     
    let submit=async(e)=>{
        e.preventDefault();
       if(type==='create'){
         let data={
            name,
            body,
            FoodUid:id
        }
        await addCollection('comments',data);
         setBody('');
        setName('');
       }else{
        editNote.body=body;
        editNote.name=name;
        await updateCollection('comments',editNote.id,editNote,false);
        setEditNote(null);
       }
       
    }

  return (
    <form onSubmit={submit} className='note-form'>
        <h3>Comments</h3>
            <label>Name</label>
            <input type='text' className='note-input' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)} value={name}/>

            <textarea  className='note-textarea' placeholder='Write your comments here...' onChange={(e)=>setBody(e.target.value)} value={body}/>

           <div className='note-actions'>
             <button type='submit' className='btn-outline'>
                {type==='create' ? 'Post' : 'Edit'}
             </button>

           {type==='update' && <button type='button' className='btn-outline' onClick={()=>setEditNote(null)}>
               Cancel
             </button>}
           </div>
    </form>
  )
}
