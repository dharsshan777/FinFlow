
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-content">

          {/* Logo and Brand */}
          <Link to="/" className="footer-brand">
            <img
              src="/images/expensewise-logo.png"
              alt="ExpenseWise Logo"
              className="footer-logo" 
            />
            <span  style={{color:'#1C325B'}}>
              Fin<span style={{color:'#6A669D'}}>Flow</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>
          </nav>

          {/* Action Buttons */}
          <div className="footer-buttons">
            <Link to="/signup" className="footer-start">
              Get Started Free
            </Link>

            <Link to="/signin" className="footer-signin">
              Sign In
            </Link>
          </div>

        </div>

  

      </div>
    </footer>
  );
}