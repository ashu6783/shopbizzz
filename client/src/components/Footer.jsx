import { Leaf, Phone, Mail, Home, Info, Truck, Shield, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 px-16 rounded-t-xl py-12 text-green-50">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-green-400" size={28} />
            <span className="text-2xl font-bold text-green-50">ShopBizz</span>
          </div>
          <p className="w-full md:w-2/3 text-green-100 leading-relaxed">
            ShopBizz is your ultimate eco-conscious destination for a seamless online shopping
            experience. We offer sustainable products, from earth-friendly fashion trends and 
            energy-efficient electronics to eco-designed home decor and essential everyday items.
          </p>
          <div className="mt-6 flex gap-4">
            <div className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition-colors">
              <Leaf size={16} className="text-green-400" />
            </div>
            <div className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition-colors">
              <Heart size={16} className="text-green-400" />
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-xl font-medium mb-5 text-green-200">COMPANY</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="/" className="flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors">
                <Home size={16} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/about" className="flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors">
                <Info size={16} />
                <span>About us</span>
              </a>
            </li>
            <li>
              <a href="/delivery" className="flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors">
                <Truck size={16} />
                <span>Delivery</span>
              </a>
            </li>
            <li>
              <a href="/privacy" className="flex items-center gap-2 text-green-300 hover:text-green-100 transition-colors">
                <Shield size={16} />
                <span>Privacy Policy</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <p className="text-xl font-medium mb-5 text-green-200">GET IN TOUCH!</p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-green-100">
              <Phone size={16} className="text-green-300" />
              <span>+91 8303361090</span>
            </li>
            <li className="flex items-center gap-2 text-green-100">
              <Mail size={16} className="text-green-300" />
              <span>contact@ShopBizz.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <hr className="border-green-800" />
        <p className="py-5 text-sm text-center text-green-200">Copyright © 2024 ShopBizz. All rights reserved.</p>
        <p className="pb-5 text-md text-center text-green-200">
          Brought to you with <Heart size={16} className="inline text-green-400" /> by 
          <span className="text-green-50 font-bold ml-1">Ashutosh Gaurav</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;