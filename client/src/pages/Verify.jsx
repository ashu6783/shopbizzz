import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        toast.error("Please login to complete the verification");
        navigate("/login");
        return;
      }

      if (!success || !orderId) {
        toast.error("Invalid payment verification parameters");
        navigate("/cart");
        return;
      }

      // Make sure this URL exactly matches your backend route
      const response = await axios.post(
        `${backendUrl}/api/orders/verifyStripe`,  // Note the exact path
        {
          orderId,
          success:success.toString(),
        },
        {
          headers: {
            token: storedToken
          }
        }
      );

      if (response.data.success) {
        toast.success("Payment verified successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      if (error.response?.status === 404) {
        toast.error("Verification endpoint not found. Please contact support.");
      } else {
        toast.error(error.response?.data?.message || "Verification failed");
      }
      navigate("/cart");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (success !== null && orderId !== null) {
      verifyPayment();
    } else {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl mb-4">Verifying Payment</h2>
        <p>Please wait while we confirm your payment...</p>
      </div>
    </div>
  );
};

export default Verify;