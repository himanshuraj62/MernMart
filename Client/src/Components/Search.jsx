import React, { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';


const placeholderItems = [
  "Search for apples 🍎",
  "Search for bananas 🍌",
  "Search for milk 🥛",
  "Search for rice 🍚",
  "Search for bread 🍞",
  "Search for eggs 🥚"
];

const Search = () => {
  const [placeholderText, setPlaceholderText] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";

  useEffect(() => {
    let intervalId;

    if (!isSearchPage) {
      let index = 0;
      setPlaceholderText(placeholderItems[index]);

      intervalId = setInterval(() => {
        index = (index + 1) % placeholderItems.length;
        setPlaceholderText(placeholderItems[index]);
      }, 2000);
    } else {
      setPlaceholderText("Search for anything...");
    }

    return () => clearInterval(intervalId);
  }, [isSearchPage]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e)=>{
    const value = e.target.value
    const url = `/search?q=${value}`
    navigate(url)
  }
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="group flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <input
          type="text"
          autoFocus
          placeholder={placeholderText}
          onChange={handleOnChange}
          className="flex-1 outline-none px-2 text-sm"
        />

        <button
          onClick={redirectToSearchPage}
          className="ml-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md flex items-center gap-1"
        >
          <SearchIcon size={16} />
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
