import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Package, Truck, Leaf} from 'lucide-react';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = React.useCallback(async () => {
    try {
      if (!token) return null;
      const response = await axios.post(
        `${backendUrl}/api/orders/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading order data:", error);
    }
  }, [backendUrl, token]);

  useEffect(() => {
    loadOrderData();
  }, [token, loadOrderData]);

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-2xl md:text-3xl mb-8">
          <Title text1={"MY"} text2={"ECO ORDERS"} />
        </div>

        <div className="space-y-6">
          {orderData.length === 0 ? (
            <p className="text-center text-gray-600">No sustainable orders yet. Start shopping eco-friendly!</p>
          ) : (
            orderData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-start gap-6 w-full md:w-2/3">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 sm:w-24 rounded-lg border border-emerald-200 object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-semibold text-gray-800">{item.name}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2 text-gray-600 text-sm md:text-base">
                      <p className="flex items-center gap-1">
                        <Leaf size={16} className="text-emerald-600" />
                        {currency}{item.price}
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Ordered: <span className="text-gray-600">{new Date(item.date).toDateString()}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Payment: <span className="text-gray-600">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                {/* Status & Tracking */}
                <div className="w-full md:w-1/3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-sm md:text-base text-emerald-700 font-medium flex items-center gap-1">
                      <Package size={16} />
                      {item.status}
                    </p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-emerald-700 transition-all"
                  >
                    <Truck size={16} />
                    Track Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Eco Footer Note */}
        {orderData.length > 0 && (
          <p className="mt-8 text-center text-sm text-gray-600 flex items-center justify-center gap-2">
            <Leaf size={16} className="text-emerald-600" />
            All orders shipped carbon-neutral
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;