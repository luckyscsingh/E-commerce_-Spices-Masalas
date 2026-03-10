import { FaGlobe, FaShareAlt, FaAt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-14 pb-8">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 1 */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">
              Spices & Masalas
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Bringing the soul of Indian kitchens to the world.
              Quality you can taste, aroma you can feel.
            </p>
          </div>
          {/* Column 2 & 3 Wrapper */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2">

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-medium mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Our Story
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Sustainability
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Recipes Blog
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Wholesale
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-medium mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Shipping Info
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Returns & Refunds
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  FAQs
                </li>
                <li className="hover:text-yellow-400 transition cursor-pointer">
                  Contact Us
                </li>
              </ul>
            </div>

          </div>
          {/* Column 4 - Newsletter + Social */}
          <div>
            <h4 className="text-white font-medium mb-4">
              Stay Updated
            </h4>

            {/* Newsletter */}
            <div className="flex items-center bg-slate-800 rounded-full overflow-hidden mb-5">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent px-4 py-2 text-sm w-full outline-none text-gray-300"
              />
              <button className="bg-yellow-500 px-4 py-2 text-sm text-black font-semibold hover:bg-yellow-600 transition">
                Join
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
                <FaGlobe size={14} />
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
                <FaShareAlt size={14} />
              </div>
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
                <FaAt size={14} />
              </div>
            </div>

          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-xs text-gray-500">
          © 2024 Spices & Masalas Co. Crafted for authentic flavor.
        </div>

      </div>
    </footer>
  );
}

export default Footer;