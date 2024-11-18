import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Nav.css';
const Nav = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    const setActive = (event) => {
        event.preventDefault();
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">
                    <div className="logo-4-container">
                        <div className="logo-4-icon"></div>
                        <div className="logo-4">
                        TREND <span className="mix">MIX</span>
                        </div>
                    </div>
                </Link>

                {/* <button className="menu-btn" onClick={toggleMenu}>☰</button> */}

                <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
                    <div className="mobile-login">
                        <Link to="/login" className="login-btn">Login</Link>
                    </div>
                    
                    {/* <li><Link to="/about" onClick={setActive}>About</Link></li> */}
                    <li><Link to="/trend">Trend</Link></li>
                    <li><Link to="/mix">Mix</Link></li>
                </ul>

                <Link to="/login" className="login-btn desktop">Login</Link>
            </div>
        </nav>
    );
};

export default Nav;