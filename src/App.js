import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/Signup';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Create from './Pages/Create';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firebase } from './firebase/config';

function App() {
const {user,setUser}= useContext(AuthContext)
const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
        // setUser(user)
      }
    })
// console.log(user);
  },[])


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sell" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
