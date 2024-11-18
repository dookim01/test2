import React from 'react';
import './App.css';
// routes
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Login from './pages/auth/Login.js';
import SignUp from './pages/SignUp/SignUp.js';
import Main from './pages/Main/Main.js';
import Trend from './pages/Trend/Trend';
import Mix from './pages/Mix/Mix.js';
// components
import Nav from './components/Nav/Nav.js';

function App() {
  // let navigate = useNavigate()
  return (
    <div className="App">
      <Nav />
      <div className='contents'>
        <div className='pages'>
          {/* <div style={{height : '120px'}}></div> */}
          <Routes>
            <Route path="/" element={ <Main/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/sign-up" element={ <SignUp/> } />
            <Route path="/trend" element={ <Trend/> } />
            <Route path="/mix" element={ <Mix/> } />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
