import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
function Posts() {

  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  // const [productDetails, setProductDetails] = useState(null);
  const {setPostDetails} = useContext(PostContext)

  const db = getFirestore()
  const myCollection =collection(db,'sellingProducts')
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const getDocuments = async ()=>{
    try {
        const allPost =  await getDocs(myCollection)
        const dataArray = [];
        allPost.forEach((doc)=>{
          dataArray.push({
            id:doc.id,
            ...doc.data(),
          })
        })
        setProducts(dataArray)
        console.log(dataArray);
  
      }catch (error) {
      console.error(error)
    }
  };
    getDocuments()
  }, [myCollection]);

  const setProduct = (product) =>{
    setPostDetails(product)
    navigate('/viewPost')
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div className="card" id={product.id} onClick={()=>setProduct(product)}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  {/* <img src="../../../Images/R15V3.jpg" alt=""/> */}
                  <img src={product.image} alt=""/>
                  
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <p className="name">{product.name}</p>
                  <span className="kilometer">{product.category}</span>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
