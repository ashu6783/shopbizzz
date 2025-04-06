import Title from "../components/Title";
import { Mail, Phone, Instagram, Leaf, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 rounded-tl-3xl to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={"CONTACT"} text2={"OUR GREEN TEAM"} />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We&apos;re committed to sustainable shopping and exceptional service. Reach out with questions about our eco-friendly products or share your green journey with us!
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/2 max-w-md">
            <img 
              className="w-full rounded-xl shadow-lg border-2 border-emerald-100" 
              src="./contact.png" 
              alt="Eco-friendly contact illustration" 
            />
          </div>

          {/* Contact Info Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-8 text-gray-700">
            {/* Intro Text */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Leaf size={16} className="mr-2" />
                Sustainable Support
              </div>
              <p className="text-lg leading-relaxed">
                At Shop-Bizz, we’re here to assist with your eco-conscious shopping needs—whether it’s order help, product details, or sustainability questions.
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
              <h3 className="text-2xl font-semibold text-emerald-700 mb-6">Get in Touch</h3>
              <ul className="space-y-6 text-lg">
                <li className="flex items-start gap-4">
                  <Mail size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Email:</span>
                    <a 
                      href="mailto:ashu00665@gmail.com" 
                      className="text-emerald-600 hover:underline block"
                    >
                      ashu00665@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Phone:</span>
                    <span className="block">+91 8303361090</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Instagram size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Instagram:</span>
                    <a 
                      href="https://www.instagram.com/_ashu91/" 
                      className="text-emerald-600 hover:underline block"
                    >
                      @ashu91
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={24} className="text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-medium">Visit Us:</span>
                    <span className="block">Eco Hub, Green Lane, India</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Eco Commitment Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Leaf size={18} className="text-emerald-600" />
            Every message helps us grow a greener future
          </p>
        </div>
      </div>
      <hr className="mt-12 border-emerald-200" />
    </div>
  );
};

export default Contact;