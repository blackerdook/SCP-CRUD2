import React from 'react';
import './main.css';

function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="home-overlay">
        <main className="home-center-content">
          <h1 className="hero-title">SCP Archive</h1>
          <p className="hero-subtitle">Secure. Contain. Protect.</p>
        </main>

        <footer className="home-footer">
          <span className="lang">ENG</span>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
