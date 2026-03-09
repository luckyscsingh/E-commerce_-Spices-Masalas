import { ShoppingCart, User, Search, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import producthero from "../assets/producthero.jpg.avif";
import turmericpowder from "../assets/turmericpowder.png.webp";
import garammasala from "../assets/garammasala.jpg";
import redchilli from "../assets/redchilli.jpg";
import cuminseeds from "../assets/cuminseeds.png.webp";
import corianderpowder from "../assets/corianderpowder.jpg";
import kashmirisaffron from "../assets/kashmirisaffron.jpg.avif";

export default function ProductDetails() {
  const { addToCart, cartItems } = useCart();

  const products = [
    {
      id: 1,
      name: "Turmeric Powder",
      price: "$8.99",
      rating: 4.9,
      badge: "Best Seller",
      image: turmericpowder,
      desc: "Pure organic Alleppey turmeric with high curcumin content for vibrant color and health.",
    },
    {
      id: 2,
      name: "Garam Masala",
      price: "$12.50",
      rating: 4.8,
      image: garammasala,
      desc: "A heritage blend of 12 roasted spices, perfect for authentic Indian curries and stews.",
    },
    {
      id: 3,
      name: "Red Chilli Powder",
      price: "$9.45",
      rating: 4.7,
      image: redchilli,
      desc: "Premium sun‑dried Kashmiri chillies ground to a fine powder for moderate heat and rich color.",
    },
    {
      id: 4,
      name: "Cumin Seeds",
      price: "$7.20",
      rating: 4.6,
      image: cuminseeds,
      desc: "Whole Jeera seeds sourced from Rajasthan, known for their intense aroma and earthy flavor.",
    },
    {
      id: 5,
      name: "Coriander Powder",
      price: "$6.50",
      rating: 4.5,
      image: corianderpowder,
      desc: "Cool-ground coriander seeds to preserve the delicate citrusy and floral aroma notes.",
    },
    {
      id: 6,
      name: "Kashmiri Saffron",
      price: "$25.00",
      rating: 5.0,
      badge: "Rare",
      image: kashmirisaffron,
      desc: "Pampore Grade A saffron strands. Authentic, hand-picked strands with unmatched color.",
    },
  ];

  return (
    <div className="bg-[#f5f3ee] min-h-screen">

      {/* ================= NAVBAR ================= */}
      <header className="bg-[#f5f3ee] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">SpiceHaven</h1>

          <nav className="hidden md:flex gap-8 text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/products" className="text-yellow-600 font-semibold">
              Products
            </Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/our-story">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-white px-4 py-2 rounded-full w-64">
              <Search size={18} />
              <input
                className="ml-2 outline-none text-sm w-full bg-transparent"
                placeholder="Search spices..."
              />
            </div>

            <Link to="/cart" className="relative">
              <ShoppingCart size={22} />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-white px-1.5 rounded-full">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            <User size={22} />
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
<section className="bg-[#f4f1eb] py-10 md:py-16">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="bg-[#e6dfd0] rounded-3xl md:rounded-[40px] overflow-hidden grid grid-cols-2 items-center">

      {/* Left */}
      <div className="p-6 md:p-12">
        <h2 className="text-2xl md:text-6xl font-bold text-[#0f172a] leading-tight mb-3 md:mb-6">
          Premium Spice Collection
        </h2>

        <p className="text-sm md:text-lg text-gray-600">
          Discover the finest hand‑picked spices from across the globe.
        </p>
      </div>

      {/* Right */}
      <div className="relative h-full">
        <img
          src={producthero}
          alt="Spices"
          className="w-full h-full blur-sm object-cover"
        />
      </div>

    </div>
  </div>
</section>

      {/* ================= PRODUCT GRID ================= */}
<section className="max-w-7xl mx-auto px-4 md:px-6 mt-8 md:mt-12 
grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

  {products.map((product) => (

    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden block"
    >

      {/* Image */}
      <div className="relative">
        <img
          src={product.image}
          className="h-40 sm:h-48 md:h-64 w-full object-cover"
        />

        {product.badge && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-xs px-2 py-1 rounded-full text-white">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">

        {/* Title + Rating */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm md:text-lg leading-snug">
            {product.name}
          </h3>

          <div className="hidden md:flex items-center text-yellow-500 text-sm">
            <Star size={16} fill="currentColor" />
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>

        {/* Description - hide on mobile */}
        <p className="hidden md:block text-gray-500 text-sm mt-2">
          {product.desc}
        </p>

        {/* Price + Add */}
        <div className="flex justify-between items-center mt-3 md:mt-6">

          <p className="text-base md:text-xl font-bold text-yellow-600">
            {product.price}
          </p>

          {/* Mobile → Small round button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              addToCart({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.replace("$", "")),
                image: product.image,
                quantity: 1,
              });
            }}
            className="md:hidden w-9 h-9 bg-yellow-500 text-white rounded-full flex items-center justify-center"
          >
            +
          </button>

          {/* Desktop → Full Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              addToCart({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.replace("$", "")),
                image: product.image,
                quantity: 1,
              });
            }}
            className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-medium transition"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

        </div>

      </div>

    </Link>

  ))}

</section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-24 py-12 bg-yellow-200/20 text-center text-gray-500 text-sm">
        <p className="font-semibold text-gray-700 mb-4">SpiceHaven</p>
        <p>© 2024 SpiceHaven Premium Masalas. All rights reserved.</p>
      </footer>

    </div>
  );
}