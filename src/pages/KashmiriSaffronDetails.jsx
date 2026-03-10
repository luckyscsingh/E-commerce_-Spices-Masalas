import { useState } from "react";
import { Star, ShoppingCart, Truck, RotateCcw, Lock, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import mainImg from "../assets/kashmirisaffron.jpg.avif";
import thumb1 from "../assets/kashmirisaffron.jpg.avif";
import thumb2 from "../assets/turmericpowder.png.webp";
import thumb3 from "../assets/garammasala.jpg";
import thumb4 from "../assets/producthero.jpg.avif";

import cardamom from "../assets/cuminseeds.png.webp";
import cinnamon from "../assets/garammasala.jpg";
import anise from "../assets/redchilli.jpg";
import turmeric from "../assets/turmericpowder.png.webp";

export default function KashmiriSaffronDetails() {
  const { addToCart, cartItems } = useCart();
  const [selectedImage, setSelectedImage] = useState(mainImg);
  const [quantity, setQuantity] = useState(1);

  const cartCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const related = [
    { id: 1, name: "Green Cardamom Pods", price: 8.5, image: cardamom },
    { id: 2, name: "True Ceylon Cinnamon", price: 9.99, image: cinnamon },
    { id: 3, name: "Whole Star Anise", price: 7.25, image: anise },
    { id: 4, name: "Organic Turmeric", price: 6.99, image: turmeric },
  ];

  return (
    <div className="bg-yellow-100/20 min-h-screen">

      {/* ================= NAVBAR ================= */}
     <Navbar/>

      {/* ================= MAIN SECTION ================= */}
      <section className="w-full bg-yellow-100/20 py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* LEFT IMAGES */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img
                src={selectedImage}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="flex gap-4 mt-6">
              {[thumb1, thumb2, thumb3, thumb4].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 object-cover rounded-xl cursor-pointer border-2 ${selectedImage === img
                    ? "border-yellow-500"
                    : "border-transparent"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="text-sm text-yellow-600 mb-2">
              Spices › Premium
            </p>

            <h1 className="text-4xl font-bold mb-4">
              Original Kashmiri Saffron
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
              <span className="text-gray-600 text-sm ml-2">
                4.9 | 124 verified reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">$12.99</span>
              <span className="line-through text-gray-400">$18.00</span>
              <span className="bg-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full">
                Save 28%
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the "Red Gold" of Kashmir. Hand‑picked from the lush
              fields of Pampore, our Grade A1 Mongra Saffron is known for its
              intense aroma, vivid color, and unparalleled health benefits.
            </p>

            {/* Feature Boxes */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-yellow-300/20 p-4 rounded-xl shadow-sm text-sm">
                ✅ 100% Pure & Organic
              </div>
              <div className="bg-yellow-300/20 p-4 rounded-xl shadow-sm text-sm">
                🚫 No Additives
              </div>
              <div className="bg-yellow-300/20 p-4 rounded-xl shadow-sm text-sm">
                📍 Direct from Pampore
              </div>
              <div className="bg-yellow-300/20 p-4 rounded-xl shadow-sm text-sm">
                🌾 Fresh 2024 Harvest
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <button
                onClick={() =>
                  addToCart({
                    id: 100,
                    name: "Original Kashmiri Saffron",
                    price: 12.99,
                    image: selectedImage,
                    quantity: quantity,
                  })
                }
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-full flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button className="flex-1 border-2 border-yellow-500 text-yellow-700 font-semibold py-4 rounded-full hover:bg-yellow-50">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            <div className="flex gap-8 text-sm text-gray-500 border-t pt-6">
              <div className="flex items-center gap-2">
                <Truck size={16} /> Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} /> 30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} /> Secure Payment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESCRIPTION SECTION ================= */}
      <section className="bg-yellow-100/20 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-700">
              Product Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our Kashmiri Saffron represents the highest grade available.
              Each thread is carefully hand‑harvested during the autumn bloom,
              delivering deep red spice that transforms any dish.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-700">
              Ethical Sourcing
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We source directly from small-scale farms in Pampore, Kashmir.
              Cutting out middlemen ensures fair compensation and fresher harvests.
            </p>
            <p className="text-yellow-600 text-sm mt-3">
              📍 Pampore, Jammu and Kashmir
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-700">
              Usage Tips
            </h3>
            <ul className="text-gray-600 text-sm space-y-2 list-disc ml-5">
              <li>Soak 4–5 threads in warm milk before use.</li>
              <li>Perfect for biryani, desserts & herbal teas.</li>
              <li>Store in cool, dry place.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= RELATED ================= */}
      <section className="py-16 bg-yellow-100/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between mb-10">
            <h2 className="text-2xl font-bold">
              You Might Also Like
            </h2>
            <Link className="text-yellow-600 font-semibold">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {related.map((item) => (
              <div
                key={item.id}
                className="bg-yellow-100/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold mb-2">{item.name}</h4>
                  <p className="text-yellow-700 font-bold">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
     <Footer/>
    </div>
  );
}