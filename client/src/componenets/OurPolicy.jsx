import React from "react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src="./exchange.png" className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-500" >
        Easily exchange your products within 30 days of purchase to ensure complete satisfaction with your order.
        </p>
      </div>
      <div>
        <img src="./return.png" className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-500" >
        Enjoy peace of mind with our hassle-free 7-day return policy for a full refund or exchange.
        </p>
      </div>
      <div>
        <img src="./support.png" className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-500" >
        "Our dedicated team is here to assist you with any questions or concerns, ensuring a seamless shopping experience.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
