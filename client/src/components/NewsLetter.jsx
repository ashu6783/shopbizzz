import React from "react";

const onSubmitHandler=(e)=>{
    e.preventDefault();
}

const NewsLetter = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-md text-gray-800">
        Subscibe now and get 20% off!!
      </p>
      <p className="text-gray-400 mt-3">
        "Stay updated with the latest deals, exclusive offers, and exciting news
        from Shipbizz. Subscribe now to never miss out on our special
        promotions!
      </p>
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx:auto my-6 border pl-3 ">
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter yout email " required/>
        <button type="submit" className="bg-teal-600 text-black text-md font-semibold px-10 py-4 rounded-md" >SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsLetter;
