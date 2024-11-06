import React from "react";

const footer = () => {
  return (
    <div>
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm">
      <div>
        <img src="./footer.png" className="w-32" alt="" /> 
        <p className="w-full md:w-2/3 text-gray-600">
          Shipbizz is your ultimate destination for a seamless online shopping
          experience. We offer a diverse range of products, from the latest
          fashion trends and cutting-edge electronics to unique home decor and
          essential everyday items. 
        </p>
      </div>
      <div>
        <p className="text-xl font-medium mb-5">COMPANY</p>
        <ul className="flex flex-col gap-1 text-gray-600" >
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className="text-xl font-medium mb-5" >GET IN TOUCH!</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>+91 8303361090</li>
          <li>contact@ShopBizz@gmail.com</li>
        </ul>
      </div>
    </div>
    <div>
      <br />
      <hr />
      <p className="py-5 text-sm text-center" >Copyright @2024</p>
      <p className="py-5 text-md text-center " > Brought to you with 💕 by <span className="text-black font-extrabold"> Ashutosh Gaurav</span>.</p>

    </div>
    </div>

  );
};

export default footer;
