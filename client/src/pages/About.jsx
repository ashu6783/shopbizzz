import Title from "../components/Title";
import { Leaf, Truck, Users, Sprout, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-black rounded-tl-3xl rounded-tr-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto font-light">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={"ABOUT"} text2={"OUR GREEN MISSION"} />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Crafting a sustainable future, one eco-friendly purchase at a time.
          </p>
        </div>

        {/* Intro Section */}
        <div className="my-12 flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="w-full md:w-2/5 lg:w-1/3">
            <img 
              className="w-full h-auto rounded-xl shadow-lg border-2 border-emerald-100 object-cover aspect-[4/3]" 
              src="./about.png" 
              alt="Our sustainable team" 
            />
            <div className="mt-4 bg-emerald-100 p-3 rounded-md text-sm text-emerald-800 italic text-center flex items-center justify-center gap-2">
              <Leaf size={16} />
              Rooted in sustainability since 2020
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-6 md:w-3/5 lg:w-2/3 text-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700">Welcome to Shop-Bizz</h2>
            <p className="leading-relaxed text-lg">
              Shop-Bizz is your gateway to eco-conscious living. We’re dedicated to delivering sustainable products, exceptional service, and a shopping experience that nurtures both people and planet.
            </p>
            <p className="leading-relaxed text-lg">
              Our team of green innovators curates ethically sourced fashion, energy-efficient tech, natural home goods, and more—designed for the conscious consumer who values quality and sustainability.
            </p>
          </div>
        </div>

        {/* Our Promise Section */}
        <div className="my-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-emerald-100">
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-700 mb-6 text-center">Our Eco-Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-emerald-50 rounded-lg transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <Sprout size={28} className="text-emerald-600 mr-3" />
                <h3 className="font-medium text-emerald-700 text-lg">Sustainable Products</h3>
              </div>
              <p className="text-gray-600">
                Partnering with eco-friendly brands to bring you goods made with organic, recycled, and ethically sourced materials.
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <Users size={28} className="text-emerald-600 mr-3" />
                <h3 className="font-medium text-emerald-700 text-lg">Green Service</h3>
              </div>
              <p className="text-gray-600">
                Our dedicated team ensures your shopping journey is seamless, supportive, and aligned with sustainable values.
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <Truck size={28} className="text-emerald-600 mr-3" />
                <h3 className="font-medium text-emerald-700 text-lg">Carbon-Neutral Delivery</h3>
              </div>
              <p className="text-gray-600">
                Fast, secure shipping with 100% carbon offset—because every delivery should tread lightly on the Earth.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="my-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-300 mb-6 text-center">Our Vision</h2>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-emerald-100">
            <p className="leading-relaxed text-lg text-gray-700">
              We dream of a world where shopping uplifts communities and preserves our planet. At Shop-Bizz, we’re building a green community—connecting eco-conscious shoppers with sustainable solutions for a brighter, cleaner future.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="my-12 bg-emerald-600 text-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Eco-Movement!</h2>
          <p className="max-w-2xl mx-auto leading-relaxed mb-6">
            Explore our curated collections, embrace sustainable living, and be part of the future of responsible shopping.
          </p>
          <button className="bg-white text-emerald-600 font-medium px-8 py-3 rounded-full hover:bg-emerald-50 transition-all duration-300">
            Shop Sustainably Now
          </button>
        </div>

        {/* Footer Note */}
        <div className="pt-6 pb-12 text-center text-sm text-emerald-300 flex items-center justify-center gap-2">
          <Globe size={18} className="text-emerald-300" />
          <p >One tree planted per purchase—growing a greener planet together.</p>
        </div>
      </div>
    </div>
  );
};

export default About;