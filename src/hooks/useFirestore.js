import React from 'react';
import { useState, useEffect,useRef } from 'react';
import { collection,query, onSnapshot,doc,deleteDoc, serverTimestamp, addDoc, updateDoc,where,orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../contexts/AuthContext';

export default function useFirestore() {

    let getCollection=(colName,_q)=>{

         const qRef=useRef(_q).current;
        let [error,setError]=useState('');
        let [loading,setLoading]=useState(false);
        let [data,setData]=useState([]);

        useEffect(()=>{
            setLoading(true)
            let ref=collection(db,colName)
            let queries=[];
            if(qRef){
                queries.push(where(...qRef))
            }
            queries.push(orderBy('date','desc'))
            let q=query(ref,...queries)

            onSnapshot(q,docs=>{
                if(docs.empty){
                    setError('No Food Data found');
                    setLoading(false);
                }
                else{
                    let collectionDatas=[];
                    docs.forEach(doc=>{
                        let document={id:doc.id, ...doc.data()}
                        collectionDatas.push(document)
                    })
                    setData(collectionDatas);
                    setLoading(false);
                    setError(null);
                }
            })
        },[colName,qRef])
        return {error,loading,data}
    }
    let getDocument=(colName,id)=>{

        let [error,setError]=useState('');
        let [loading,setLoading]=useState(false);
        let [data,setData]=useState([]);

        useEffect(()=>{
            setLoading(true);
            let ref=doc(db,colName,id)
            onSnapshot(ref,docs=>{
                if(docs.exists()){
                    let document={id: docs.id, ...docs.data()}
                    setData(document);
                    setLoading(false);
                    setError('');
                }
                else{
                    setError('No Data Found');
                    setLoading(false);
                }
            })
            
        },[colName,id])
    return {error,loading,data}
    }
    let addCollection=(colName,data)=>{

        data.date=serverTimestamp();
        let ref=collection(db,colName)
        return addDoc(ref,data)
    }
    let deleteDocument=async(colName,id)=>{
        let ref=doc(db,colName,id)
        return deleteDoc(ref)
    }
    let updateCollection=(colName,id,data,updateDate=true)=>{
        if(updateDate){
              data.date=serverTimestamp();
        }
        let ref=doc(db,colName,id)
        return updateDoc(ref,data)
    }
    let getUser=(colName)=>{
        let [error,setError]=useState('');
        let [loading,setLoading]=useState(false);
        let [data,setData]=useState([]);

        useEffect(()=>{
            let ref=collection(db,colName);
            let q=query(ref)
            onSnapshot(q,docs=>{
               if(docs.empty){
                setError('No Data Found');
                setLoading(false);
               }
               else{
                 let collectionDatas=[];
                docs.forEach(doc=>{
                    let document={id:doc.id, ...doc.data()}
                    collectionDatas.push(document);
                })
                setData(collectionDatas);
                setLoading(false);
                setError('');
               }
            })
        },[colName])
        return {error,loading,data}
    }


  return {getCollection,getDocument,addCollection,deleteDocument,updateCollection,getUser}
}
