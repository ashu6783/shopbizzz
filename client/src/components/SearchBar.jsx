import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection") ) {
      setVisible(true);
    }else{
      setVisible(false);
    }
  },[location]);
  return showSearch &&visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
          className="flex-1 outline-none bg-inherit text-sm "
        />
        <img src="./search.png" alt="" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src="./cross.png"
        className="inline w-6 cursor-pointer "
        alt=""
      />
    </div>
  ) : null;
};

export default SearchBar;
