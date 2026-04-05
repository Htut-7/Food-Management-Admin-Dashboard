import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../css/FoodDetail.css";
import Comment from '../components/Comment';
import CommentsList from '../components/CommentsList';

export default function FoodDetail() {

    const {id}=useParams();

    let {getDocument}=useFirestore();
    let {error,loading,data:food}=getDocument('food',id);

    if(error){
        return <p>{error}</p>
    }

  return (
    <>
        <div className='fooddetail'>
        {loading && <p>Loading...</p>}

        <div className='fooddetail-container'>
            {food && (
                <div className='detail'>
                    <img src={food.image} alt={food.name}/>
                    <h3>{food.name}</h3>
                    <p>Price: {food.price}</p>

                    <div className='detail-catg'>
                        {food.category?.map(c=>(
                            <span key={c}>{c}</span>
                        ))}
                    </div>
                    <span>{food.description}</span>

                    <div className='detail-btn'>
                        <Link to='/foods'>Back</Link>
                    </div>
                    <hr />

                    <div className='comment-wrapper'>
                        <Comment/>
                        <CommentsList/>
                    </div>
                </div>
            )}
        </div>
    </div>
    </>
    
  )
}
