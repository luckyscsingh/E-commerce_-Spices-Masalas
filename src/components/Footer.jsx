const Footer = () => {
  return (
    <footer className="bg-[#0B1A3A] text-white pt-14 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="font-bold text-lg mb-4">🌶️ Spices & Masalas</h2>
          <p className="text-gray-300 text-sm">
            Crafting heritage flavors from trusted farms and bringing
            authentic spices to your kitchen.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Our Farms</li>
            <li>Organic Promise</li>
            <li>Wholesale</li>
            <li>Spice Blog</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="font-semibold mb-4">Customer Care</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Shipping Policy</li>
            <li>Returns & Refunds</li>
            <li>Track Order</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4">Join Our Newsletter</h3>

          <div className="flex border rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 text-white outline-none"
            />

            <button className="bg-yellow-500 px-4 font-medium">
              Subscribe
            </button>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-400 text-sm mt-10">
        © 2026 Spices & Masalas. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;