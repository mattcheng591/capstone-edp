import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavBar = () => {
  return (
    <div className="navContainer">
      <ul>
        <li>
          <Link to="/" className="navbar-brand">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-brand">
            About
          </Link>
        </li>
        <li>
          <Link to="/contactus" className="navbar-brand">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
