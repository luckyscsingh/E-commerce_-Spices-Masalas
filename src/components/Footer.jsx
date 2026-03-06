import { FaGlobe, FaShare, FaAt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Column 1 */}
        <div>
          <h4 className="font-bold text-white mb-4">Spices & Masalas</h4>
          <p>
            Bringing the soul of Indian kitchens to the world.
            Quality you can taste, aroma you can feel.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer">Our Story</li>
            <li className="hover:text-yellow-400 cursor-pointer">Sustainability</li>
            <li className="hover:text-yellow-400 cursor-pointer">Recipes Blog</li>
            <li className="hover:text-yellow-400 cursor-pointer">Wholesale</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer">Shipping Info</li>
            <li className="hover:text-yellow-400 cursor-pointer">Returns & Refunds</li>
            <li className="hover:text-yellow-400 cursor-pointer">FAQs</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Column 4 - Social Icons */}
        <div>
          <h4 className="font-semibold text-white mb-4">Connect</h4>
          
          <div className="flex space-x-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaGlobe />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaShare />
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaAt />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © 2024 Spices & Masalas Co. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;