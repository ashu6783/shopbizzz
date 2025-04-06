import { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Leaf, CreditCard, Truck, CheckCircle } from 'lucide-react';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/orders/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            toast.success("Your Eco-Friendly Order Placed Successfully!");
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }
        case "stripe": {
          const responseStripe = await axios.post(
            `${backendUrl}/api/orders/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing your order.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="bg-gradient-to-b from-emerald-50 to-black rounded-tl-3xl rounded-tr-3xl py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Delivery Info */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
          <div className="text-xl md:text-2xl mb-6">
            <Title text1={"ECO"} text2={"DELIVERY INFO"} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                onChange={onChangeHandler}
                name="firstName"
                required
                value={formData.firstName}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                placeholder="First Name"
              />
              <input
                onChange={onChangeHandler}
                name="lastName"
                value={formData.lastName}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder="Street Address"
            />
            <div className="flex gap-4">
              <input
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                placeholder="City"
              />
              <input
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex gap-4">
              <input
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="number"
                placeholder="Zip Code"
              />
              <input
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              className="border border-emerald-200 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="tel"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Right Side - Cart Total & Payment */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <CartTotal />
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border border-emerald-200 p-3 rounded-lg cursor-pointer transition-all ${
                  method === "stripe" ? "bg-emerald-50 border-emerald-500" : "hover:bg-emerald-50"
                }`}
              >
                <CheckCircle
                  size={20}
                  className={`text-emerald-600 ${method === "stripe" ? "opacity-100" : "opacity-0"}`}
                />
                <CreditCard size={24} className="text-emerald-600" />
                <p className="text-gray-700 font-medium">Pay with Stripe</p>
              </div>
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border border-emerald-200 p-3 rounded-lg cursor-pointer transition-all ${
                  method === "cod" ? "bg-emerald-50 border-emerald-500" : "hover:bg-emerald-50"
                }`}
              >
                <CheckCircle
                  size={20}
                  className={`text-emerald-600 ${method === "cod" ? "opacity-100" : "opacity-0"}`}
                />
                <Truck size={24} className="text-emerald-600" />
                <p className="text-gray-700 font-medium">Cash on Delivery</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition-all"
              >
                <Leaf size={20} />
                Place Eco Order
              </button>
            </div>
          </div>

          {/* Eco Note */}
          <p className="text-sm text-emerald-300 flex items-center gap-2 justify-end">
            <Leaf size={16} className="text-emerald-300" />
            Your order supports a greener planet
          </p>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;