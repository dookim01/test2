import React from 'react';
import './App.css';
// routes
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Main from './pages/Main.js';
// components
import Header from './components/common/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Main/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/sign-up" element={ <SignUp/> } />
      </Routes>
    </div>
  );
}

export default App;
