import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="shadow-sm py-4 transition-all duration-300 border-b">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <div 
          className={`flex items-center w-full bg-gray-100 rounded-full px-4 py-2 border transition-all duration-200 ${
            focused ? "border-blue-500 shadow-sm bg-white" : "border-transparent"
          }`}
        >
          <img 
            src="./search.png" 
            alt="Search" 
            className="w-5 h-5 mr-3 opacity-60"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search products..."
            className="flex-1 outline-none bg-transparent text-sm py-1"
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button
          onClick={() => setShowSearch(false)}
          className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;