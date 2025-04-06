import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { Trash2, Leaf, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="bg-gradient-to-b from-emerald-50 rounded-tl-3xl rounded-tr-3xl to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-2xl md:text-3xl mb-8">
          <Title text1={"YOUR"} text2={"ECO CART"} />
        </div>

        {/* Cart Items */}
        <div className="space-y-6">
          {cartData.length === 0 ? (
            <p className="text-center text-gray-600 flex items-center justify-center gap-2">
              <ShoppingCart size={20} className="text-emerald-600" />
              Your eco-cart is empty. Start shopping sustainably!
            </p>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4 md:gap-6 transition-all hover:shadow-md"
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-4 md:gap-6">
                    <img
                      className="w-16 sm:w-20 rounded-lg border border-emerald-200 object-cover"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-semibold text-gray-800">
                        {productData.name}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2 text-gray-600">
                        <p className="flex items-center gap-1">
                          <Leaf size={16} className="text-emerald-600" />
                          {currency}{productData.price}
                        </p>
                        <p className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-sm">
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <input
                    onChange={(e) =>
                      e.target.value === "" || e.target.value === "0"
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className="border border-emerald-200 rounded-md w-16 sm:w-20 px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="text-emerald-600 hover:text-emerald-800 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Total & Checkout */}
        {cartData.length > 0 && (
          <div className="flex justify-end mt-12">
            <div className="w-full sm:w-[450px] flex flex-col gap-6">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/placeorder")}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                >
                  <Leaf size={20} />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Eco Footer Note */}
        {cartData.length > 0 && (
          <p className="mt-8 text-center text-sm text-white flex items-center justify-center gap-2">
            <Leaf size={16} className="text-emerald-300" />
            Your cart supports sustainable living
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;