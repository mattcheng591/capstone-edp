import React, { useState } from "react";

const Filter = (props) => {
  const [filterType, setFilterType] = useState("");

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
    const finalFilter = activeFilters.length > 0 ? activeFilters[0] : ""; // Set to "" if no filters are active

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
        props.setShoes(data);
        console.log("Filtered data:", data);
        // Update the UI with the filtered data
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
  };

  return (
    <form>
      <div className="checkbox-wrapper-1">
        <div>
          <input
            className="substituted"
            type="checkbox"
            id="boots"
            name="boots"
            checked={filterType.boots}
            onChange={handleCheckboxChange}
            aria-hidden="true"
          />
          <label className="form-check-label" htmlFor="boots">
            Boots
          </label>
        </div>
        <div>
          <input
            className="substituted"
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
      </div>
    </form>
  );
};

export default Filter;
