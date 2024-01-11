import React, { useContext, useEffect, useState } from "react";

import "./View.css";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
import { getDocs, getFirestore, query, collection, where } from "firebase/firestore";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  const userId = postDetails?.userId;
  const db = getFirestore();
  // const collectionName = 'users'
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(userId);
        // const detailsQuery = query(
        //   collection(db, "users").where("id", "==", userId)
        // );
        // const querySnapshot = await getDocs(detailsQuery);

        // querySnapshot.forEach((doc) => {
        //   const documentData = doc.data();
        //   console.log('hihi',documentData);
        //   setUserDetails(documentData);
        // });
        const q = query(collection(db, 'users'), where('uid', '==', userId));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    const documentData = doc.data();
                    setUserDetails(documentData)
                });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
      {postDetails?.image && <img src={postDetails.image} alt="" />}  
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.displayName}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
