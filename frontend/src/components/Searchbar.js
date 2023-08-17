import React, { useState } from 'react';


const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let debounceTimeout;

  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    setSearchTerm(searchTerm);
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/search/${searchTerm}`
        );
        const jsonData = await response.json(); // Extract JSON data
        setSearchResults(jsonData);
        console.log(jsonData)

      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }, 300); // Increase delay for debounce timeout
  };
  return (
        <div className="flex flex-col items-center h-auto">
          <div className="flex items-center justify-center w-full">

            <input
              type="text"
              className="w-8/12 mx-auto rounded-m h-20 border focus:border-none focus:outline-none focus:ring-2 focus:ring-green-200 text-3xl"
              placeholder="Search for Stocks"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {searchResults && searchResults.length > 0 && (
            <ul className=" w-8/12 mx-auto bg-white   rounded-m h-auto border focus:border-none  text-3xl">
              {searchResults.map((result) => (
                    <li key={result.symbol} className="flex items-center justify-between  py-2 border-gray-300 hover:bg-gray-100 transition duration-300">
                    <span className="text-3xl font-semibold">{result.symbol}</span>
                    <span className="text-2xl text-gray-500">{result.longname}</span>
                  </li>
              ))}
            </ul>
          )}
        </div>
  );
};

  export default SearchBar;