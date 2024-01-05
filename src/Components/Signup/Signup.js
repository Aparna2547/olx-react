import React, { useState ,useContext} from 'react';
import { auth } from '../../firebase/config'
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('')
  const [password,setPassword] = useState('')

const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  const handleSubmit =async (e) =>{
    e.preventDefault()
    const auth = getAuth();
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
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
