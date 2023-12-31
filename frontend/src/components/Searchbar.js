import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const clearSearchTerm = () => {
    setSearchTerm('');
  };
  return (
        <div className="flex flex-col items-center h-auto">
          <div className="flex items-center justify-center w-8/12 mt-10">
            <div className='w-full relative'>
            <input
              type="text"
              className="w-full pl-10 mx-auto rounded-m h-14 border focus:border-none focus:outline-none focus:ring-2 focus:ring-green-200 text-3xl"
              placeholder="Search for Stocks"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults && searchResults.length > 0 && (
            <ul className=" absolute w-full mx-auto bg-white  rounded-m h-auto border focus:border-none  text-3xl">
              {searchResults.map((result) => (
                <Link to = {'/stocks/' + result.symbol.toLowerCase()} onClick={clearSearchTerm}>
                    <li key={result.symbol} className="flex items-center px-10 justify-between  py-2 border-gray-300 hover:bg-gray-100 transition duration-300">
                    <span className="text-3xl font-semibold">{result.symbol}</span>
                    <span className="text-2xl text-gray-500">{result.longname}</span>
                  </li>
                  </Link>
              ))}
            </ul>
          )}
            </div>
          </div>
          

        </div>
  );
};

  export default SearchBar;