import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { Leaf, Truck, ShoppingBag } from 'lucide-react';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
      <div className="text-2xl mb-4">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      
      <div className="flex flex-col gap-4 text-gray-700">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-emerald-600" />
            <span className="text-sm md:text-base">Subtotal</span>
          </p>
          <p className="font-medium">
            {currency}{getCartAmount()}.00
          </p>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2">
            <Truck size={18} className="text-emerald-600" />
            <span className="text-sm md:text-base">Eco Shipping Fee</span>
          </p>
          <p className="font-medium">
            {currency}{delivery_fee}.00
          </p>
        </div>

        <hr className="border-emerald-200" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <b className="flex items-center gap-2 text-emerald-700">
            <Leaf size={20} className="text-emerald-600" />
            <span className="text-base md:text-lg">Green Total</span>
          </b>
          <b className="text-emerald-700 text-base md:text-lg">
            {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>

        {/* Eco Note */}
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 justify-end">
          <Leaf size={14} className="text-emerald-600" />
          Carbon-neutral shipping included
        </p>
      </div>
    </div>
  );
};

export default CartTotal;