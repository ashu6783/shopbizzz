import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Leaf, ChevronRight, Recycle } from 'lucide-react';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setLatestProducts(products.slice(0, 10));
            setIsLoading(false);
        }, 300);
    }, [products]);

    const categories = ['All', 'Eco-Wear', 'Green Home', 'Natural Accessories', 'Clean Beauty'];

    return (
        <section className="py-16 bg-gradient-to-b rounded-xl from-green-50 to-transparent">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Leaf size={16} className="mr-2" />
                        100% Eco-Conscious
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Latest <span className="text-emerald-600">Planet-Loving</span> Arrivals
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Explore sustainable treasures crafted with organic fibers, recycled materials, and zero-waste principles.
                    </p>
                </div>

                {/* Category tabs */}
                <div className="overflow-x-auto pb-4 mb-8">
                    <div className="flex justify-center space-x-3 min-w-max">
                        {categories.map((category, index) => (
                            <button 
                                key={index}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${activeTab === category.toLowerCase() 
                                        ? 'bg-emerald-600 text-white shadow-md' 
                                        : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'}`}
                                onClick={() => setActiveTab(category.toLowerCase())}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products display */}
                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="aspect-square bg-emerald-100 rounded-xl"></div>
                                <div className="h-4 bg-emerald-100 rounded mt-3 w-3/4"></div>
                                <div className="h-3 bg-emerald-100 rounded mt-2 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {latestProducts.map((item, index) => (
                            <div key={index} className="group relative">
                                {/* Eco-badges */}
                                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                    {index % 3 === 0 && (
                                        <span className="bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                            <Leaf size={12} className="mr-1" /> Organic
                                        </span>
                                    )}
                                    {index % 3 === 1 && (
                                        <span className="bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                            <Recycle size={12} className="mr-1" /> Recycled
                                        </span>
                                    )}
                                    {index % 3 === 2 && (
                                        <span className="bg-lime-600 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                            Zero Waste
                                        </span>
                                    )}
                                </div>

                                {/* Product card */}
                                <div className="bg-white rounded-xl p-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 border border-emerald-100">
                                    <ProductItem 
                                        id={item._id} 
                                        image={item.image} 
                                        name={item.name} 
                                        price={item.price} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View all button */}
                <div className="flex justify-center mt-10">
                    <a href="#" className="group inline-flex items-center bg-emerald-600 text-white py-3 px-8 rounded-full font-medium hover:bg-emerald-700 transition-all duration-300">
                        Explore All Eco-Finds
                        <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LatestCollection;