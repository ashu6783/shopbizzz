import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src="./ShopBizz.png" className="w-36" alt="" />
      </Link>
      <ul className=" hidden sm:flex gap-5 text-lg text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-9">
        <img
          onClick={() => setShowSearch(true)}
          src="./search.png"
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          
           
            <img  onClick={()=>token ? null : navigate('/login')} src="./account.png" className="w-5 cursor-pointer" alt="" />
         {/* -----------Dropdown menu------------- */}
          {token && 
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-black text-gray-400 rounded">
              <p className="cursor-pointer hover:text-white">My profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-white">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-white">
                Logout
              </p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <img src="./cart.png" className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom -[-5px] w-4 text-center leading-4 text-sm bg-black text-white aspect-square rounded-full text-[8px">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src="./menu.png"
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/*Sidebar for small screen*/}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-900">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img className="h-4 rotate-180" src="./menu.png" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(true)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(true)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(true)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(true)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
