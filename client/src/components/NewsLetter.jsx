import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");
    // Here you would typically handle the actual submission to your backend
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-xl shadow-md max-w-3xl mx-auto my-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-teal-800">Get Exclusive Offers</h2>
        <p className="text-lg text-gray-600 mt-3">
          Subscribe now and enjoy <span className="bg-teal-100 px-2 py-1 rounded-md font-semibold text-teal-800">20% off</span> your next purchase!
        </p>
      </div>
      
      <p className="text-gray-600 text-center mb-6">
        Join the Shipbizz community to receive personalized recommendations, 
        early access to sales, and shipping tips from industry experts.
      </p>
      
      {isSubmitted ? (
        <div className="bg-teal-100 p-4 rounded-lg text-center">
          <p className="text-teal-800 font-medium">Thanks for subscribing! Check your inbox soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 mx-auto">
          <div className="relative w-full">
            <input 
              className="w-full px-4 py-3 rounded-lg border-2 border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
              type="email"
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            Subscribe Now
          </button>
        </form>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  );
};

export default NewsLetter;