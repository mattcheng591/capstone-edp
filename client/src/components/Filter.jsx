import React, { useState } from "react";

const Filter = () => {
  const [filterType, setFilterType] = useState({
    boots: false,
    sneakers: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Update the filterType state
    const updatedFilterType = {
      ...filterType,
      [name]: checked,
    };
    setFilterType(updatedFilterType);

    // Apply the filters immediately
    applyFilters(updatedFilterType);
  };

  const applyFilters = (filters) => {
    // Extract only the keys with true values
    const activeFilters = Object.keys(filters).filter((key) => filters[key]);
    const finalFilter = activeFilters[0];
    // Example: Send the active filters to the server
    console.log(finalFilter);
    fetch("http://localhost:5050/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filterTerm: finalFilter }), // Send only the active filters
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Filtered data:", data);
        // Update the UI with the filtered data
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
  };

  return (
    <form>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="boots"
          name="boots"
          checked={filterType.boots}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="boots">
          Boots
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="sneakers"
          name="sneakers"
          checked={filterType.sneakers}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="sneakers">
          Sneakers
        </label>
      </div>
    </form>
  );
};

export default Filter;
