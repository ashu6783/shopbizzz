import { useContext, useState } from "react";
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
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };
  
  return (
    <div className="bg-black text-white py-2 sm:py-4 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="./logo.svg" className="w-24 sm:w-36 rounded-2xl" alt="ShopBizz Logo" />
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 text-gray-300 text-sm lg:text-base">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition-all duration-300 hover:text-white relative pb-1 ${
                isActive ? "text-white" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>HOME</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`}></span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/collection" 
            className={({ isActive }) => 
              `transition-all duration-300 hover:text-white relative pb-1 ${
                isActive ? "text-white" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>COLLECTION</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`}></span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `transition-all duration-300 hover:text-white relative pb-1 ${
                isActive ? "text-white" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>ABOUT</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`}></span>
              </>
            )}
          </NavLink>
          
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `transition-all duration-300 hover:text-white relative pb-1 ${
                isActive ? "text-white" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>CONTACT</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`}></span>
              </>
            )}
          </NavLink>
        </ul>
        
        {/* Actions Menu */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button 
            onClick={() => setShowSearch(true)}
            className="p-1 sm:p-2 rounded-full bg-white hover:bg-gray-300 transition-colors"
          >
            <img src="./search.png" className="w-4 sm:w-5" alt="Search" />
          </button>
          
          <div className="relative group">
            <button
              onClick={() => token ? null : navigate('/login')}
              className="p-1 sm:p-2 rounded-full bg-white hover:bg-white-300 transition-colors"
            >
              <img src="./account.png" className="w-4 sm:w-5" alt="Account" />
            </button>
            
            {/* Account Dropdown menu */}
            {token && (
              <div className="invisible group-hover:visible absolute right-0 pt-3 w-40 z-10">
                <div className="bg-gray-900 rounded-md shadow-lg py-2 border border-gray-700">
                  <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 hover:text-white transition-colors">
                    My Profile
                  </button>
                  <button 
                    onClick={() => navigate('/orders')}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Orders
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            to="/cart" 
            className="relative p-1 sm:p-2 rounded-full bg-white hover:bg-lime-300 transition-colors"
          >
            <img src="./cart.png" className="w-4 sm:w-5" alt="Cart" />
            {getCartCount() > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full text-xs">
                {getCartCount()}
              </div>
            )}
          </Link>
          
          <button
            onClick={() => setVisible(true)}
            className="p-1 sm:p-2 rounded-full hover:bg-white bg-white transition-colors md:hidden"
          >
            <img src="./menu.png" className="w-4 sm:w-5" alt="Menu" />
          </button>
        </div>
      </div>
      
      {/* Mobile Sidebar with improved accessibility */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
        aria-hidden={!visible}
      >
        <div 
          className={`absolute top-0 right-0 bottom-0 w-64 bg-gray-900 transform transition-transform ${
            visible ? "translate-x-0" : "translate-x-full"
          } overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setVisible(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <img className="h-4 rotate-180" src="./menu.png" alt="Close" />
              </button>
            </div>
            
            <div className="flex flex-col py-2">
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) => 
                  `px-4 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300"
                  }`
                }
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) => 
                  `px-4 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300"
                  }`
                }
                to="/collection"
              >
                COLLECTION
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) => 
                  `px-4 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300"
                  }`
                }
                to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) => 
                  `px-4 py-3 hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300"
                  }`
                }
                to="/contact"
              >
                CONTACT
              </NavLink>
              
              {/* Add mobile-specific user account links when logged in */}
              {token && (
                <>
                  <div className="border-t border-gray-800 my-2"></div>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setVisible(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/orders');
                      setVisible(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Orders
                  </button>
                </>
              )}
            </div>
            
            {/* Mobile logout button at bottom */}
            {token && (
              <div className="mt-auto border-t border-gray-800 py-2">
                <button
                  onClick={() => {
                    logout();
                    setVisible(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            
            {/* Login button for mobile if not logged in */}
            {!token && (
              <div className="mt-auto border-t border-gray-800 py-2">
                <button
                  onClick={() => {
                    navigate('/login');
                    setVisible(false);
                  }}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;