import React, { useState ,useContext} from 'react';
import { auth } from '../../firebase/config'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')

const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)

  
  const handleSubmit =async (e) =>{
    e.preventDefault()
    const auth = getAuth();

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(username.length <1){
      console.log('no length')
      setError("Enter a valid username")
    }
    
    else if(!emailRegex.test(email)){
      setError("Enter valid email")
    }
    else if(mobile.length!==10){
      setError("enter valid mobile")
    }
    else if(password.length<6){
      setError("enter password")
    }
    else{
      
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
        displayName: username
    })
    console.log(userCredential);
    userCredential.user.displayName = username
    const db = getFirestore();
    await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        displayName: username,
        phone: mobile,
    });
    navigate('/login')
    }
  } catch (error) {
    
  }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            defaultValue="Doe"
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
          {error && <p>{error}</p>}
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
