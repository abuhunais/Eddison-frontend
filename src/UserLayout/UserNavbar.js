import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Nav.css'; 

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/userhome">
          Eddison
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/searchproduct">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                Category Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">
                ContactUs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Signin">
                Signout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/replypage">
                Message
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
