import { ShoppingCart, User, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-yellow-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
          <h1 className="text-xl font-bold text-gray-800">
            Spices & Masalas
          </h1>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-yellow-600 transition">Home</a>
          <a href="#" className="hover:text-yellow-600 transition">Spices</a>
          <a href="#" className="hover:text-yellow-600 transition">Masalas</a>
          <a href="#" className="hover:text-yellow-600 transition">Organic</a>
          <a href="#" className="hover:text-yellow-600 transition">Contact</a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full w-64 shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search spices..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-gray-700" size={22} />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </div>

          {/* User */}
          <User className="text-gray-700 cursor-pointer" size={22} />
        </div>

      </div>
    </header>
  );
}