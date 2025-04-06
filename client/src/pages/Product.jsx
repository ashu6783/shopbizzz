import { useContext, useEffect, useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Leaf, Star, Truck, RefreshCcw, ShoppingCart } from 'lucide-react';

const RelatedProducts = lazy(() => import("../components/RelatedProducts"));

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      const foundProduct = products.find(item => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
      }
      setLoading(false);
    };
    fetchProductData();
  }, [productId, products]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
    </div>
  );

  const LazyImage = ({ src, alt, className, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
      <div className="relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
            <div className="w-8 h-8 border-b-2 border-emerald-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={src}
          alt={alt || "Eco-friendly product"}
          className={`${className} ${imageLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          onClick={onClick}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    );
  };

  LazyImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  if (loading) return <LoadingSpinner />;

  return productData ? (
    <div className="bg-gradient-to-b from-emerald-50 to-white rounded-tl-3xl rounded-tr-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Product Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="flex-1 flex flex-col-reverse gap-4 lg:flex-row">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto justify-between lg:w-1/5 gap-3">
              {productData.image.map((item, index) => (
                <LazyImage
                  key={index}
                  src={item}
                  onClick={() => setImage(item)}
                  className="w-20 h-20 lg:w-full object-cover rounded-lg border border-emerald-200 cursor-pointer hover:border-emerald-500 transition-all"
                />
              ))}
            </div>
            <div className="w-full lg:w-4/5">
              <LazyImage
                src={image}
                className="w-full h-auto rounded-xl shadow-md border border-emerald-100"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={20} className="text-emerald-600" />
              <span className="text-sm text-emerald-700 font-medium">Sustainable Choice</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{productData.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Star size={18} className="text-yellow-400 fill-current" />
              <span className="text-gray-600">4.5 (122 reviews)</span>
            </div>
            <p className="text-3xl font-bold text-emerald-700 mt-4">
              {currency}{productData.price}
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {productData.description} - Crafted with eco-friendly materials for a greener planet.
            </p>

            {/* Size Selection */}
            <div className="mt-6">
              <p className="text-gray-700 font-medium mb-2">Select Size</p>
              <div className="flex gap-3 flex-wrap">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      item === size 
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700" 
                        : "border-emerald-200 hover:border-emerald-400 text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(productData._id, size)}
              className="mt-6 bg-emerald-600 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!size}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Product Features */}
            <hr className="my-6 border-emerald-100" />
            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <Leaf size={16} className="text-emerald-600" /> 100% Eco-Friendly Materials
              </p>
              <p className="flex items-center gap-2">
                <Truck size={16} className="text-emerald-600" /> Carbon-Neutral Shipping
              </p>
              <p className="flex items-center gap-2">
                <RefreshCcw size={16} className="text-emerald-600" /> 7-Day Easy Returns
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
          <div className="flex border-b border-emerald-100">
            <button className="px-6 py-3 text-sm font-medium text-emerald-700 border-b-2 border-emerald-600">
              Description
            </button>
            <button className="px-6 py-3 text-sm text-gray-600 hover:text-emerald-700">
              Reviews (122)
            </button>
          </div>
          <div className="py-6 text-gray-600 text-sm space-y-4">
            <p>
              {productData.description} - This product is part of our commitment to sustainability, using responsibly sourced materials and eco-conscious production methods.
            </p>
            <p>
              Designed for durability and style, it’s perfect for the environmentally aware shopper looking to make a positive impact.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <Suspense fallback={<LoadingSpinner />}>
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </Suspense>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-64 text-xl text-gray-600">
      No eco-friendly product found
    </div>
  );
};

export default Product;