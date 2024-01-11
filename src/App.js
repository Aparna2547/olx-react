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
import View from './Pages/ViewPost';
import Post from './store/PostContext'
import ErrorPage from './Components/404/ErrorPage';



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
      <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
      { !user &&
         (
          <>
         <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          </>
          )}
          <Route path="/viewPost" element={<View />} />

          {user ?
            <Route path="/sell" element={<Create />} />:
            <Route path="/sell" element={<ErrorPage />} />
          }
          <Route path='*' element={<ErrorPage/>} />

        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
