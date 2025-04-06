import { useState, useEffect } from 'react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentAnimated, setContentAnimated] = useState(false);
  
  // Simulate image loading and handle animations
  useEffect(() => {
    const img = new Image();
    img.src = "./hero.png";
    img.onload = () => {
      // Only start image animation after content animation completes
      setTimeout(() => setImageLoaded(true), 500);
    };
    
    // Start content animation immediately
    setTimeout(() => setContentAnimated(true), 100);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg shadow-md overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Hero left side - Content */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div 
          className={`text-gray-800 max-w-md transform transition-all duration-500 ${
            contentAnimated 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-8 opacity-0'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-1 bg-emerald-600 rounded-full"></div>
            <p className="font-medium text-sm text-emerald-600 tracking-wider">ECO-FRIENDLY COLLECTION</p>
          </div>
          
          <h1 className="pacifico-regular text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Sustainable Style
          </h1>
          
          <p className="text-gray-600 mb-6">
            Discover our handcrafted pieces made from recycled materials that look good and feel even better.
          </p>
          
          <div className="flex items-center gap-4 mt-6">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-colors">
              EXPLORE NOW
            </button>
            <button className="border-2 border-emerald-600 text-emerald-600 px-6 py-2.5 rounded-full font-medium hover:bg-emerald-50 transition-colors">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
      
      {/* Hero right side - Image with lazy loading */}
      <div className="w-full sm:w-1/2 relative min-h-64">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-emerald-100 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12  animate-pulse text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div 
          className={`h-full transform transition-all duration-500 ease-out ${
            contentAnimated && imageLoaded 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-8 opacity-0'
          }`}
        >
          <img 
            className="w-full h-full object-cover"
            src="./hero.png" 
            alt="Eco-friendly fashion collection" 
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;