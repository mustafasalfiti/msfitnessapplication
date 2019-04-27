import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
    <div className="nav-logo">
      <a className="btn" href="#">
        MS Fitness
      </a>
    </div>
    <div className="nav-links">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contactus">Contact us</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  </nav>
  )
}