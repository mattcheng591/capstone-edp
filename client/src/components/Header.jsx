import React from "react";
import Search from "./Search";

const Header = ({ setShoes }) => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">Travis Scott's Astronomical Online Store</h1>
        {/* <Search setShoes={setShoes} /> */}
      </div>
    </header>
  );
};

export default Header;
