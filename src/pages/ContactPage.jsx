import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully ✅");
  };

  return (
    <div className="min-h-screen bg-yellow-100/20 flex flex-col">
{/* ================= NAVBAR ================= */}
<div className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

    {/* Logo */}
    <h1 className="text-xl font-bold">
      <span className="text-yellow-600">Spice</span>Haven
    </h1>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-10 text-gray-700 font-medium">
      <Link to="/">Home</Link>
      <Link to="/spices">Shop</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/our-story">Our Story</Link>
    </div>

    {/* Right Icons */}
    <div className="flex items-center gap-4">

      {/* Cart Icon */}
      <button
        onClick={() => navigate("/cart")}
        className="relative p-2 rounded-full hover:bg-yellow-100 transition"
      >
        <ShoppingCart size={22} className="text-gray-700" />

        {/* Cart Badge (Optional) */}
        <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          2
        </span>
      </button>

      {/* Profile Icon */}
      <button
        onClick={() => navigate("/profile")}
        className="p-2 rounded-full hover:bg-yellow-100 transition"
      >
        <User size={22} className="text-gray-700" />
      </button>

    </div>
  </div>
</div>

      {/* ================= HERO ================= */}
      <div className="text-center py-20 px-6">
        <span className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full text-xs font-semibold tracking-wide">
          SUPPORT CENTER
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mt-6">
          Get in <span className="text-yellow-600">Touch</span>
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-6">
          Whether you're curious about our sourcing, need help with an order,
          or just want to share a recipe, our spice experts are here to help
          you elevate your cooking.
        </p>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">

       {/* ================= LEFT: SEND MESSAGE ================= */}
<div className="bg-[#f5f3ef] rounded-[28px] p-8 md:p-10 shadow-sm">

  <h3 className="text-2xl font-semibold text-gray-900 mb-8">
    Send us a Message
  </h3>

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Full Name + Email */}
    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

    </div>

    {/* Subject */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subject
      </label>
      <select
        className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <option>Order Inquiry</option>
        <option>Shipping Question</option>
        <option>Wholesale</option>
        <option>General Support</option>
      </select>
    </div>

    {/* Message */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Message
      </label>
      <textarea
        rows="6"
        placeholder="Tell us how we can help..."
        className="w-full rounded-xl border border-yellow-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
      ></textarea>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-yellow-500/30 transition"
    >
      Send Message
      <span className="text-lg">→</span>
    </button>

  </form>
</div>

        {/* ================= RIGHT: CONTACT INFO ================= */}
        <div className="space-y-6">

          <div className="bg-yellow-600 text-white rounded-3xl p-8 relative overflow-hidden">

            <h3 className="text-xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 text-sm">

              <div className="flex gap-4">
                <MapPin />
                <div>
                  <p className="font-medium">Visit Our Warehouse</p>
                  <p>
                    123 Spice Route Avenue, Khari Baoli,
                    Delhi, India 110006
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p>+91 (11) 2345–6789</p>
                  <p className="text-yellow-200 text-xs">
                    Mon–Sat, 9am – 6pm IST
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:support@spicehaven.com">
                    support@spicehaven.com
                  </a>
                </div>
              </div>
            </div>

            <hr className="my-6 border-yellow-400" />

            <p className="text-xs uppercase tracking-wide mb-4">
              Follow Our Journey
            </p>

            <div className="flex gap-4">
              <a href="#" className="bg-yellow-500 p-2 rounded-full">
                <Instagram size={16} />
              </a>
              <a href="#" className="bg-yellow-500 p-2 rounded-full">
                <Facebook size={16} />
              </a>
              <a href="#" className="bg-yellow-500 p-2 rounded-full">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* MAP PREVIEW */}
          <div className="bg-white rounded-3xl p-4 shadow-sm">
            <iframe
              title="warehouse-map"
              src="https://www.google.com/maps?q=Delhi,India&output=embed"
              className="w-full h-52 rounded-2xl"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="bg-yellow-50 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 mt-2">
              Find quick answers to common questions in our help center.
            </p>
          </div>

          <button
            onClick={() => navigate("/faq")}
            className="border border-yellow-600 text-yellow-700 px-6 py-3 rounded-full"
          >
            Visit FAQ Center
          </button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-white border-t mt-16 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm">

          <div>
            <h4 className="font-bold text-lg mb-4">
              <span className="text-yellow-600">Spice</span>Haven
            </h4>
            <p className="text-gray-600">
              Bringing authentic flavors of India directly to your kitchen.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Explore</h5>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/best-sellers">Our Best Sellers</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/wholesale">Wholesale</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Company</h5>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Stay Inspired</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="border rounded-l-full px-4 py-2 w-full"
              />
              <button className="bg-yellow-600 text-white px-5 rounded-r-full">
                Join
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          © 2024 SpiceHaven Collective. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}