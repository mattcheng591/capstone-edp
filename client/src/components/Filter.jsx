import React, { useState } from "react";

const Filter = (props) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [filterType, setFilterType] = useState({
    boot: false,
    sneaker: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5050/filter`, {
      method: "POST",
      body: JSON.stringify({ filterTerm, filterType }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        props.setShoes(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setFilterTerm(e.target.value);
    console.log(filterTerm);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilterType((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <form className="d-flex flex-column" role="filter" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          className="form-control me-2"
          type="filter"
          placeholder="Filter for Shoe Brand"
          aria-label="Filter"
          value={filterTerm}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="boot"
            name="boot"
            checked={filterType.boot}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="boot">
            Boot
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="sneaker"
            name="sneaker"
            checked={filterType.sneaker}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="sneaker">
            Sneaker
          </label>
        </div>
      </div>
      <button className="btn btn-outline-success" type="submit">
        Filter
      </button>
    </form>
  );
};

export default Filter;
