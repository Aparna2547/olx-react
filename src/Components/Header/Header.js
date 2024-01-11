import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';


// import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Login from "../Login/Login";
function Header() {
  const { user,setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  // const history = useHistory()

  const handleLogout = (async()=>{
    const auth = getAuth()
    try {
        await signOut(auth);
        setUser(null)
        navigate('/login')
    } catch (error) {
        console.error('Error logging out:', error);
    }
})



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'> <OlxLogo></OlxLogo></Link>
         
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
           <span style={{cursor:'pointer'}}>{user.displayName}</span> 
          ) : (
            <Link to="/login">
              <span className="text-dark">Login</span>
            </Link>
          )}

          <hr />
        </div>
        {user && <span style={{cursor:'pointer'}} onClick={handleLogout}>Logout </span>}

        {user && (
              <>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            
               <Link to='/sell' className="text-decoration-none text-dark mx-0">
                <SellButtonPlus  />
                <span>SELL:</span>
                </Link>
          </div>
         
        </div>
        </>
          )}
        {/* <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Header;
