import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function HomeHeader() {
  return (
    <header className="home-header">
      <div className="home-logo">
        SCP<span className="dot">.</span>
      </div>

      <nav className="home-nav-center">
        <Link to="/">Home</Link>
        <Link to="/item/1">Directory</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <div className="home-sign">
        <button className="sign-btn">Sign In</button>
      </div>
    </header>
  );
}

export default HomeHeader;
