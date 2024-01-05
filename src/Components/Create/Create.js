import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import 'firebase/storage';

const Create = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const date = new Date();

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  

  const handleSubmit = async  () =>{
    // firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
    //   ref.getDownloadURL().then((url)=>{
    //     console.log(url);
    //   })
    // })
    const db= getFirestore();
    await addDoc(collection(db,'sellingProducts'),{
      name,
      category,
      price,
      userId:user.uid,
      createdAt:date.toString()
    });
    navigate('/success')

  }


    
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) =>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) =>setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price}
              onChange={(e) =>setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
         
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
