import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue(""); // Clear the input after search
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="p-2 border rounded-l text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter city name"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
