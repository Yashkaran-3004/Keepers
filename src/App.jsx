import React,{ useState } from 'react';
import './App.css';
import{BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Notes from './Notes';


function App() {

  return (<Router>
   

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  </Router>)
}

export default App;
