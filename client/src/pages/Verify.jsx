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
      // Debug logging
      console.log("Starting payment verification with:", {
        success,
        orderId,
        backendUrl,
        currentUrl: window.location.href
      });

      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        console.log("No token found in localStorage");
        toast.error("Please login to complete the verification");
        navigate("/login");
        return;
      }

      if (!success || !orderId) {
        console.log("Missing parameters:", { success, orderId });
        toast.error("Invalid payment verification parameters");
        navigate("/cart");
        return;
      }

      const verifyUrl = `${backendUrl}/api/orders/verifyStripe`;
      console.log("Making verification request to:", verifyUrl);

      const response = await axios.post(
        verifyUrl,
        {
          orderId,
          success: success.toString(),
        },
        {
          headers: {
            token: storedToken,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Verification response:", response.data);

      if (response.data.success) {
        toast.success("Payment verified successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        console.log("Verification failed with response:", response.data);
        toast.error(response.data.message || "Verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.error('Verification error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
        url: error.config?.url
      });
      
      if (error.response?.status === 404) {
        toast.error("Verification endpoint not found. Please contact support.");
      } else if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Payment verification failed");
      }
      navigate("/cart");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log("Verify component mounted with params:", {
      success: searchParams.get("success"),
      orderId: searchParams.get("orderId")
    });

    if (success !== null && orderId !== null) {
      verifyPayment();
    } else {
      console.log("Missing required parameters, redirecting to cart");
      navigate("/cart");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {isProcessing ? (
          <>
            <h2 className="text-xl mb-4">Verifying Payment</h2>
            <p>Please wait while we confirm your payment...</p>
          </>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Verify;