import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, Search, X, Menu, LogOut, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
       navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
       setShowSearch(false);
       setSearchQuery("");
    }
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-yellow-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* ✅ Left Section (Hamburger + Logo) */}
        <div className="flex items-center gap-3">

          {/* Mobile Hamburger */}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden text-gray-700 hover:text-yellow-600 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">SH</div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
              SpiceHaven
            </h1>
          </Link>
        </div>

        {/* ✅ Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-yellow-600 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-600 transition">Shop</Link>
          <Link to="/our-story" className="hover:text-yellow-600 transition">Our Story</Link>
          <Link to="/recipes" className="hover:text-yellow-600 transition">Recipes</Link>
        </nav>

        {/* ✅ Right Section */}
        <div className="flex items-center gap-5 relative">

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white px-4 py-2 rounded-full w-64 shadow-sm border border-gray-200 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 transition">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spices..."
              className="bg-transparent outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
            />
          </form>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden text-gray-700 hover:text-yellow-600 transition"
          >
            <Search size={22} />
          </button>

          {/* Mobile Expand Search */}
          {showSearch && (
            <div className="absolute top-0 right-0 left-0 bg-white p-4 shadow-md md:hidden flex items-center gap-3 z-50">
              <form onSubmit={handleSearch} className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Search size={18} className="text-gray-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search spices..."
                    className="flex-1 bg-transparent outline-none text-sm ml-2 text-gray-700"
                  />
              </form>
              <button onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-red-500 transition p-2">
                <X size={20} />
              </button>
            </div>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-700 hover:text-yellow-600 transition group p-1 w-10 h-10 flex items-center justify-center">
            <ShoppingCart size={24} />
            {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 bg-yellow-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
               <span className="text-sm font-medium text-gray-600 truncate max-w-[100px]" title={user?.name}>
                   Hi, {user?.name?.split(' ')[0] || "User"}
               </span>
               <button
                 onClick={() => {
                   logout();
                   navigate("/login");
                 }}
                 className="text-gray-500 hover:text-red-500 transition flex items-center gap-1 text-sm font-medium"
                 title="Logout"
               >
                 <LogOut size={18} />
               </button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex text-gray-700 hover:text-yellow-600 transition p-1">
              <User size={24} />
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Mobile Slide Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="bg-white w-72 h-full shadow-2xl flex flex-col">

            <div className="flex justify-between items-center p-6 border-b border-gray-100">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-xs">SH</div>
                 <h2 className="font-bold text-lg text-gray-900">SpiceHaven</h2>
               </div>
              <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-gray-900 transition p-2 bg-gray-50 rounded-full">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 p-6 text-gray-700 font-medium flex-grow">
              <Link to="/" onClick={() => setShowMenu(false)} className="p-3 hover:bg-yellow-50 rounded-xl transition">Home</Link>
              <Link to="/products" onClick={() => setShowMenu(false)} className="p-3 hover:bg-yellow-50 rounded-xl transition flex items-center gap-2"><Package size={18}/> Shop All</Link>
              <Link to="/our-story" onClick={() => setShowMenu(false)} className="p-3 hover:bg-yellow-50 rounded-xl transition">Our Story</Link>
              <Link to="/recipes" onClick={() => setShowMenu(false)} className="p-3 hover:bg-yellow-50 rounded-xl transition">Recipes</Link>
            </nav>

            {/* Mobile Auth Section */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
                {user ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center font-bold">
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{user?.name || "User"}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <button onClick={() => { logout(); setShowMenu(false); navigate("/login"); }} className="p-2 text-gray-400 hover:text-red-500 transition">
                            <LogOut size={20} />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => { setShowMenu(false); navigate("/login"); }} className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-xl hover:bg-yellow-700 transition flex justify-center items-center gap-2">
                        <User size={18} />
                        Login / Sign Up
                    </button>
                )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
