import { useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Success = () => {
  const { setCartItems, token, backendUrl, navigate } = useContext(ShopContext);

  useEffect(() => {
    const clearCart = async () => {
      try {
        // Clear backend cart
        await axios.post(`${backendUrl}/api/cart/clear`, {}, {
          headers: { token },
        });

        // Clear frontend cart
        setCartItems({});
        toast.success("Thank you! Your order has been placed.");
      } catch (error) {
        console.error(error);
        toast.error("Order placed but failed to clear cart.");
      }
    };

    clearCart();
  }, [backendUrl, token, setCartItems]);

  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold text-emerald-600">Payment Successful 🎉</h2>
      <p className="mt-4">Your eco-friendly order has been placed. Thank you for shopping sustainably!</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default Success;
