import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (<>
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">

      <div className="container-fluid">

        <Link className="navbar-brand" to="/">

          Eddison

        </Link>

        <div className={`collapse navbar-collapse`}>

          <ul className="navbar-nav ms-auto mb-2 mb-md-0">

            <li className="nav-item">

              <Link className="nav-link" to="/addproduct">

                Add Product

              </Link>

            </li>

            <li className="nav-item">

              <Link className="nav-link" to="/Inventreport">

                Generate Report

              </Link>
              

            </li>
            <li className="nav-item">

              <Link className="nav-link" to="/contactpage">

                Queries

              </Link>
              

            </li>

            <li className="nav-item">

              <Link className="nav-link" to="/sales">

                Sales Report

              </Link>

            </li>

            <li className="nav-item">

              <Link className="nav-link" to="/Admin">

                Logout

              </Link>

            </li>

          </ul>

        </div>

      </div>

    </nav>

  </>
  );
}
