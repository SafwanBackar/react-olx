import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {addDoc, collection} from 'firebase/firestore'
import {FirebaseContext, AuthContext} from '../../store/FirebaseContext'
import {getStorage,getDownloadURL, ref , uploadBytesResumable} from "firebase/storage";
import { useHistory} from 'react-router-dom';
import {db} from '../../firebase/config'



const Create = () => {
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(image);
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);
    const date = new Date()
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
            try {
                const docRef = addDoc(collection(db, "products"), {
                name,
                category,
                price,
                downloadURL,
                userId:user.uid,
                createdAt: date.toDateString()
              })
              history.push('/')
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          })
        } 
      )
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input  value={price}
              onChange={e => setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
            <br />
            <input onChange={e=>{setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
