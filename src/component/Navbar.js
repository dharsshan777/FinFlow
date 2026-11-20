import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar1.css';


export default function Navbar() {
return ( 
  <div>



<nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'#F4F9FF'}}>

  <div className="container">

    {/* Logo and Heading */}
    <Link to="/" className="navbar-brand d-flex align-items-center gap-2">

      <img
        src="/images/expensewise-logo.png"
        alt="ExpenseWise Logo"
        width="45"
        height="45"
      />

      <div className="d-flex align-items-center">
        <span className="fw-bold fs-4" style={{ color: '#1C325B' }}>
          Fin
        </span>

        <span className="fw-bold fs-4" style={{ color: '#6A669D' }}>
          Flow
        </span>
      </div>

    </Link>

    {/* Toggler Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Navigation Links */}
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  <ul className="navbar-nav ms-auto">

    <li className="nav-item m-1">
      <NavLink to="/" className="nav-link ho1">Home</NavLink>
    </li>

    <li className="nav-item  m-1">
      <NavLink to="/features" className="nav-link fo1">Features</NavLink>
    </li>

    <li className="nav-item  m-1">
      <NavLink to="/abt" className="nav-link ao1">About</NavLink>
    </li>

    <li className="nav-item m-2">
      <Link to="/signin" className="btn sign1">Sign In</Link>
    </li>

    <li className="nav-item m-2">
      <Link to="/signup" className="btn start1">Get Started</Link>
    </li>

  </ul>
</div>

    {/* button */}




  </div>

</nav>

</div>
);
}
