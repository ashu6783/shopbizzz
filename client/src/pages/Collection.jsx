import { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { Filter, ChevronDown, Leaf, Sprout } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isLoading, setIsLoading] = useState(true);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      let productsCopy = products.slice();

      if (showSearch && search) {
        productsCopy = productsCopy.filter(item =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
      }
      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      }

      setFilterProducts(productsCopy);
      setIsLoading(false);
    }, 300);
  }, [products, search, showSearch, category, subCategory]);

  const sortProducts = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      let fpCopy = filterProducts.slice();
      switch (sortType) {
        case "low-high":
          setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
          break;
        case "high-low":
          setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
          break;
        default:
          applyFilter();
          return;
      }
      setIsLoading(false);
    }, 300);
  }, [filterProducts, sortType, applyFilter]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFilterProducts(products);
      setIsLoading(false);
    }, 300);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, applyFilter]);

  useEffect(() => {
    if (sortType !== "relevant") {
      sortProducts();
    }
  }, [sortType, sortProducts]);

  const ProductsSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-emerald-100 h-64 rounded-xl"></div>
          <div className="h-4 bg-emerald-100 rounded mt-3 w-3/4"></div>
          <div className="h-3 bg-emerald-100 rounded mt-2 w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 lg:gap-10">
        {/* Filter Sidebar */}
        <div className="min-w-64 bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
          <div 
            onClick={() => setFilter(!showFilter)}
            className="flex items-center justify-between text-xl font-semibold text-emerald-700 cursor-pointer mb-6"
          >
            <span className="flex items-center gap-2">
              <Filter size={20} /> Filters
            </span>
            <ChevronDown size={20} className={`sm:hidden ${showFilter ? "rotate-180" : ""} transition-transform`} />
          </div>

          {/* Categories */}
          <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
            <p className="mb-4 text-sm font-medium text-emerald-600 flex items-center gap-2">
              <Leaf size={16} /> Eco Categories
            </p>
            <div className="flex flex-col gap-3 text-gray-700">
              {["Eco-Men", "Eco-Women", "Eco-Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>

            {/* Sub-Categories */}
            <p className="mt-6 mb-4 text-sm font-medium text-emerald-600 flex items-center gap-2">
              <Sprout size={16} /> Product Types
            </p>
            <div className="flex flex-col gap-3 text-gray-700">
              {["Organic Topwear", "Recycled Bottomwear", "Sustainable Winterwear"].map((subCat) => (
                <label key={subCat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={subCat}
                    onChange={toggleSubCategory}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-sm">{subCat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <Title text1={"ECO"} text2={"COLLECTIONS"} />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="mt-4 sm:mt-0 bg-white border border-emerald-200 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="relevant">Sort: Most Sustainable</option>
              <option value="low-high">Sort: Price Low to High</option>
              <option value="high-low">Sort: Price High to Low</option>
            </select>
          </div>

          {isLoading ? (
            <ProductsSkeleton />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProducts.length > 0 ? (
                filterProducts.map((item, index) => (
                  <div key={index} className="group relative">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                      <ProductItem
                        name={item.name}
                        id={item._id}
                        price={item.price}
                        image={item.image}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No sustainable products match your filters.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;