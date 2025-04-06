import { Leaf, RefreshCw, HeadphonesIcon } from "lucide-react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around gap-8 py-16 px-4 text-center bg-emerald-950 text-emerald-50">
      <div className="flex-1 p-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-emerald-700 rounded-full">
            <RefreshCw className="w-8 h-8 text-emerald-100" />
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2">Easy Exchange Policy</h3>
        <p className="text-emerald-200 max-w-xs mx-auto">
          Easily exchange your products within 30 days of purchase to ensure complete satisfaction with your order.
        </p>
      </div>
      
      <div className="flex-1 p-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-emerald-700 rounded-full">
            <Leaf className="w-8 h-8 text-emerald-100" />
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2">7 Days Return Policy</h3>
        <p className="text-emerald-200 max-w-xs mx-auto">
          Enjoy peace of mind with our hassle-free 7-day return policy for a full refund or exchange. We recycle all returned products responsibly.
        </p>
      </div>
      
      <div className="flex-1 p-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 transition-all duration-300 shadow-lg transform hover:-translate-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-emerald-700 rounded-full">
            <HeadphonesIcon className="w-8 h-8 text-emerald-100" />
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2">Best Customer Support</h3>
        <p className="text-emerald-200 max-w-xs mx-auto">
          Our dedicated team is here to assist you with any questions or concerns, ensuring a seamless and sustainable shopping experience.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;