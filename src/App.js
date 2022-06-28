import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import './App.css';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from  './store/PostContext'

function App() {
  const {firebase} = useContext(FirebaseContext)
  const {setUser} = useContext(AuthContext)
  useEffect(()=>{
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
    <div>
  <Post>
      <Router>
        <Route exact path='/'>
           <Home />
        </Route>
        <Route path='/signup'>
           <Signup />
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/create'>
          <Create/>
        </Route>
        <Route path='/view'>
          <View/>
        </Route>
      </Router>
  </Post>   
    </div>
  );
}

export default App;
