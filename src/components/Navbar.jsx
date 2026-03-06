import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          🌶️ Spices & Masalas
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-red-600 cursor-pointer">Home</li>
          <li className="hover:text-red-600 cursor-pointer">Our Story</li>
          <li className="hover:text-red-600 cursor-pointer">The Farms</li>
          <li className="hover:text-red-600 cursor-pointer">Shop</li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-5">
          <Search size={20} className="cursor-pointer"/>
          <User size={20} className="cursor-pointer"/>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {open ? (
            <X onClick={() => setOpen(false)} />
          ) : (
            <Menu onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col items-center py-5 gap-4">
            <li>Home</li>
            <li>Our Story</li>
            <li>The Farms</li>
            <li>Shop</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;