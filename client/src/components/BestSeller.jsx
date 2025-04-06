import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Leaf, Award, ArrowRight } from "lucide-react";
import ProductItem from "./ProductItem";
// import { Navigate } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);
  
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestseller(bestProduct.slice(0, 5));
  }, [products]);
  
  return (
    <section className="py-16 bg-gradient-to-b rounded-xl from-green-50 to-transparent">
      <div className="container mx-auto px-4">
        {/* Eco-friendly title section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="text-green-600" size={20} />
            <h2 className="text-green-800 text-lg font-medium">SUSTAINABLE CHOICES</h2>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-green-700" size={24} />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              <span className="text-green-700">BEST</span> SELLERS
            </h1>
          </div>
          
          <p className="text-sm md:text-base text-gray-600 max-w-2xl text-center leading-relaxed">
            Our best-selling products are carefully selected for their eco-friendly materials and sustainable 
            production processes. Each purchase contributes to our mission of protecting the planet while 
            delivering exceptional quality to you.
          </p>
        </div>

        {/* Product grid with eco-styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-8">
          {bestseller.map((item, index) => (
            <div key={index} className="flex flex-col h-full group">
              <div className="relative overflow-hidden rounded-lg bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md flex-grow">
                {/* Eco badge */}
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full z-10 flex items-center">
                  <Leaf size={12} className="mr-1" />
                  <span>Eco</span>
                </div>
                
                <ProductItem 
                  id={item._id} 
                  name={item.name} 
                  image={item.image} 
                  price={item.price} 
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="flex justify-center mt-8">

          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full transition-colors duration-300 text-sm">
            View all sustainable products 
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;