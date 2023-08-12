import React, { useState } from 'react';

const SearchBar = () => {
    const [isSearchBarActive, setSearchBarActive] = useState(false);
  
    const handleSearchBarToggle = () => {
      setSearchBarActive(!isSearchBarActive);
    };
  
    return (
        <div className="flex items-center justify-center h-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            onFocus={handleSearchBarToggle}
            onBlur={handleSearchBarToggle}
            className={`px-4 py-2 w-40 rounded-lg shadow-md outline-none ${
              isSearchBarActive ? 'bg-white' : 'bg-gray-100'
            }`}
          />
          {/* Search icon or other content can be added here */}
        </div>
        {/* Overlay */}
        {isSearchBarActive && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" onClick={handleSearchBarToggle} />
        )}
      </div>
    );
  };

  export default SearchBar;