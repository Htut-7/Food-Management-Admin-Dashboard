import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

export default function useLogout() {

    let [error,setError]=useState('');
    let [loading,setLoading]=useState(true);

    const logOut=async()=>{
        try{
            setLoading(true);
            let res=await signOut(auth);
            setLoading(false);
            setError('');
            return (res.user)
        }catch(e){
            setError(e.message);
            setLoading(false);
        }
    }

  return{error,loading,logOut}
}
