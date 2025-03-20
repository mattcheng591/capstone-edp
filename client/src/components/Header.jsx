import React from "react";
import Search from "./Search";
import NavBar from "./NavBar";

const Header = ({ setShoes }) => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">Travis Scott's Astronomical Online Store</h1>
        {/* <Search setShoes={setShoes} /> */}
        <NavBar></NavBar>
      </div>
    </header>
  );
};

export default Header;
