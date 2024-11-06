import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestseller(bestProduct.slice(0, 5));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-sm md:text-base text-gray-600">
          Sure! Shipbizz is your go-to e-commerce platform for a seamless
          shopping experience. Our website is designed to offer a diverse range
          of products, from the latest fashion trends and electronics to unique
          home decor and essentials. Whether you're looking for top-quality
          brands or discovering hidden gems, Shipbizz has something for
          everyone. Enjoy fast and reliable shipping, secure payment options,
          and exceptional customer service with every purchase. Happy shopping
          with Shipbizz!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6" >
        {
            bestseller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}  />
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
