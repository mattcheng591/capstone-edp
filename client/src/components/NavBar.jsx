import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
