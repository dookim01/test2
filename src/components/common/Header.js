import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';  // Link import 추가
// Header Component
const Header = () => {
    return (
    <div>
      <header className="w-full p-4 bg-white shadow-sm">
      <nav class="navbar">
          <Link to="/"><a class="logo">TRAND <span>MIX</span></a></Link>
          <ul class="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Trand</a></li>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Company</a></li>
          </ul>
          <div class="auth-buttons">
              <Link to="/login"><button class="login-btn">Login</button></Link>
              <Link to="/sign-up"><button class="signup-btn">Sign up</button></Link>
          </div>
      </nav>
      </header>
    </div>
    );
  };

  export default Header;