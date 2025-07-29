import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Employee Management System
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/" className="nav-link">
              Employee List
            </Link>
          </li>
          <li>
            <Link to="/add" className="nav-link">
              Add Employee
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 