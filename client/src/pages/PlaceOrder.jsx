import React, { useState,useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {

  const [method,setMethod]=useState('cod')

  const {navigate}=useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[40vh] border-t">
      {/* -----------Left side------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          className="border border-gray-300 rounded p-2 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded p-2 w-full"
          type="text"
          placeholder="Street Name"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="number"
            placeholder="Zip-code"
          />
          <input
            className="border border-gray-300 rounded p-2 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded p-2 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-4 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex border-gray-800  items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border border-gray-900 rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
              <img className="h-12 mx-4" src="./stripe.png" alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex border-gray-800  items-center gap-3 border p-2 px-3 cursor-pointer " >
              <p className={`min-w-3.5 h-3.5 border  border-gray-900 rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
              <img className="h-4 mx-4" src="./razorpay.png" alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className="flex  border-gray-800 items-center gap-3 border p-2 px-3 cursor-pointer " >
              <p className={`min-w-3.5 h-3.5 border  border-gray-900 rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className="text-gray-600 text-base font-medium mx-4">Cash on Delivery</p>
            </div>
          </div>
          <div className="w-full text-end  mt-8" >
            <button  onClick={()=>navigate('./orders')} className="bg-black rounded-xl text-white px-20 py-3 text-sm" >PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
