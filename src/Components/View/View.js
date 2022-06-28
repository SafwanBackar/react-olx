import { fireEvent } from '@testing-library/react';
import React,{useEffect,useContext,useState} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase/config'


import './View.css';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext) 
  const {firebase} = useContext(FirebaseContext)
  useEffect(async ()=>{
    const {userId} = postDetails
    const q =  query(collection(db, "users"), where("id", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc =>{
      setUserDetails(doc.data())
    })

  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.downloadURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
       </div>
       { userDetails &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>  }
      </div>
    </div>
  );
}
export default View;
