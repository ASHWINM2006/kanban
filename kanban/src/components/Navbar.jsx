import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
     
        <li className="navbar-item">
          <Link to="/signup" className="navbar-link">Sign Up</Link>
        </li>

        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>

        <li className="navbar-item">
          <button onClick={handleLogout} className="navbar-button logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
