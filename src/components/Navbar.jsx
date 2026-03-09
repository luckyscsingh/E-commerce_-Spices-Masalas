import { useAuth } from "../context/AuthContext";
import { ShoppingCart, User, Search, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-yellow-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* ✅ Left Section (Hamburger + Logo) */}
        <div className="flex items-center gap-3">

          {/* Mobile Hamburger */}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              Spices & Masalas
            </h1>
          </Link>
        </div>

        {/* ✅ Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/our-story" className="hover:text-yellow-600">Our Story</Link>
          <Link to="/spices" className="hover:text-yellow-600">Spices</Link>
          <Link to="/recipes" className="hover:text-yellow-600">Recipes</Link>
          <Link to="/contact" className="hover:text-yellow-600">Contact</Link>
        </nav>

        {/* ✅ Right Section */}
        <div className="flex items-center gap-4 relative">

          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-full w-64 shadow-sm border border-gray-200">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search spices..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden"
          >
            <Search size={22} />
          </button>

          {/* Mobile Expand Search */}
          {showSearch && (
            <div className="absolute top-0 right-0 left-0 bg-white p-4 shadow-md md:hidden flex items-center gap-3">
              <Search size={18} />
              <input
                autoFocus
                type="text"
                placeholder="Search spices..."
                className="flex-1 outline-none"
              />
              <button onClick={() => setShowSearch(false)}>
                <X size={20} />
              </button>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={22} />
          </Link>

          {/* User */}
          {user ? (
            <button
              onClick={logout}
              className="hidden md:block text-sm text-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <User size={22} />
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Mobile Slide Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="bg-white w-64 h-full p-6 shadow-lg">

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setShowMenu(false)}>
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-gray-700 font-medium">
              <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
              <Link to="/our-story" onClick={() => setShowMenu(false)}>Our Story</Link>
              <Link to="/spices" onClick={() => setShowMenu(false)}>Spices</Link>
              <Link to="/masalas" onClick={() => setShowMenu(false)}>Masalas</Link>
              <Link to="/contact" onClick={() => setShowMenu(false)}>Contact</Link>
            </nav>

          </div>
        </div>
      )}
    </header>
  );
}