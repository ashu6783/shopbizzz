import { createContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//---------------Create context for the shop---------------
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  //-----------------Define constants and state variables------------
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  //------------------Function to add items to the cart-------------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Update local cart data
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    // Sync with backend
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to update cart: " + error.message);
      }
    }
  };

  //--------------------Function to get the total count of items in the cart----------------------
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        totalCount += cartItems[items][size] || 0;
      }
    }
    return totalCount;
  };

  //-----------------Function to update the quantity of a specific item in the cart--------------------------
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size] != null) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      // Sync with backend
      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/update`,
            { itemId, size, quantity },
            { headers: { token } }
          );
        } catch (error) {
          console.error(error);
          toast.error("Failed to update cart: " + error.message);
        }
      }
    }
  };

  //--------------Function to get the total amount of items in the cart-------------
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        if (itemInfo && cartItems[items][size] > 0) {
          totalAmount += itemInfo.price * cartItems[items][size];
        }
      }
    }
    return totalAmount;
  };

  //---------------------------Function to fetch product data from the backend----------
  const getProductData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products: " + error.message);
    }
  }, [backendUrl]);

  //----------------------Function to fetch user cart data-------------------------
  const getUserCart = useCallback(async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: {token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {}); // Set default to empty object
      } else {
        toast.error("Failed to fetch cart data: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart data: " + error.message);
    }
  }, [backendUrl]);
  
  

  //----------------------Effect to fetch product data-------------------------
  useEffect(() => {
    getProductData();
  }, [getUserCart, token, getProductData]);





  

  useEffect(() => {
    if (!token) {
      // Clear cart and local storage when token is removed (logout)
      setCartItems({}); // Reset cart state
      localStorage.removeItem("token"); // Clear token from local storage
    }
  }, [token, getUserCart]);
  

  //----------------------Effect to initialize token and fetch cart-------------------------
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, [getUserCart, token]);

  //----------------------Effect to fetch cart when token changes-------------------------
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token, getUserCart]);

  //----------------Define the context value to be provided to consumers---------------------------
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
