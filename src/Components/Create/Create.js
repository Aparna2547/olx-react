import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "firebase/storage";

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const date = new Date();
  const [error,setError] = useState()

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  
  const handleSubmit = () => {
    const storage = getStorage();
    const storageRef = ref(storage, "image/" + image.name);
    const date = new Date();

    // console.log("user", user);
    try{
      if(name.trim().length<4){
        setError("enter valid product name")
      }else if(category.trim().length<3){
        setError("Enter valid category")
      }else if(price <1){
        setError('Enter valid price')
      }else if(image.length==0){
        setError("Select an image")
      }
      else{
uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            const db = getFirestore();
            console.log(downloadURL);
            addDoc(collection(db, "sellingProducts"), {
              name: name,
              category: category,
              price: price,
              image: downloadURL,
              date: date.toDateString(),
              userId: user.uid,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
      });
      }
    
    }
    catch(error){
      console.log(error);
    }
    
  };

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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          {image ? (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>
          ) : (
            <input onChange={handleImageChange} type="file" />
          )}

          <br />
          <p>{error}</p>
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
