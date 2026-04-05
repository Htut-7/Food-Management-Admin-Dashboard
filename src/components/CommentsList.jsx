import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import "../css/CommentsList.css";
import Comment from './Comment';

export default function CommentsList() {

    const {id}=useParams();
    let {getCollection,deleteDocument}=useFirestore();
    let {error,loading,data:comments}=getCollection('comments',['FoodUid','==',id]);
    let [editNote,setEditNote]=useState('');

    if(error){
        return <p>{error}</p>
    }

    let deleteComment=async(e,id)=>{
        e.preventDefault();
        await deleteDocument('comments',id);
    }

  return (
    <div className='comment-list'>
        <h3>Comment List</h3>
        {loading && <p>Loading...</p>}

        <div className='comment-contianer'>
            {comments && comments.map(c=>(
                <div key={c.id} className='single-comment'>
                    <h4>{c.name || 'Annonymous'}</h4>
                    <p>Date: {moment(c.date?.seconds *1000).fromNow()}</p>
                    <span>{c.body}</span>
                    {editNote?.id === c.id && <Comment type='update' setEditNote={setEditNote} editNote={editNote}/>}

                    <button className='comment-delete' onClick={(e)=>deleteComment(e,c.id)}>Delete</button>
                    <button className='comment-edit' onClick={()=>setEditNote(c)}>Edit</button>
                </div>
            ))}
        </div>
    </div>
  )
}
