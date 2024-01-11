import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import Logo from '../../olx-logo.png';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
// import Login from '.'

{/* <Login /> */}
function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')


  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate();


  const handleLogin = async(e) =>{
   try {
    const auth = getAuth();
    e.preventDefault()
    await signInWithEmailAndPassword(auth,email,password)
    navigate('/')
   } catch (error) {
    // alert(error.message)
      setError(error.message)
   }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          {error && <p className="error-message text-danger text-center fw-bold">Invalid Email or Password</p>}
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>
        <a>Signup</a>
        </Link>
      </div>
    </div>
  );
}

export default Login;
