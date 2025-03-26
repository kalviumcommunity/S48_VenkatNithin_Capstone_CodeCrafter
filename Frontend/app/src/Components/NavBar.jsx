import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import CSS for NavBar

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/login" className="nav-link">
        Login
      </Link>
      <Link to="/register" className="nav-button">
        Register
      </Link>
    </nav>
  );
};

export default NavBar;
