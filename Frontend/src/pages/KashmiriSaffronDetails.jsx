import { useState, useEffect } from "react";
import { Star, ShoppingCart, Truck, RotateCcw, Lock, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Fallback related products
import cardamom from "../assets/cuminseeds.png.webp";
import cinnamon from "../assets/garammasala.jpg";
import anise from "../assets/redchilli.jpg";
import turmeric from "../assets/turmericpowder.png.webp";

export default function KashmiriSaffronDetails() {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
        const mainImage = res.data.image?.startsWith("http") ? res.data.image : `http://localhost:5000/uploads/${res.data.image}`;
        setSelectedImage(mainImage);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const related = [
    { id: '1', name: "Green Cardamom Pods", price: 8.5, image: cardamom },
    { id: '2', name: "True Ceylon Cinnamon", price: 9.99, image: cinnamon },
    { id: '3', name: "Whole Star Anise", price: 7.25, image: anise },
    { id: '4', name: "Organic Turmeric", price: 6.99, image: turmeric },
  ];

  if (loading) {
    return (
      <div className="bg-yellow-100/20 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-yellow-100/20 min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  const basePrice = product.basePrice || 0;
  const discountPrice = product.discountPrice || basePrice;
  const hasDiscount = discountPrice < basePrice;
  const originalPrice = basePrice;
  const priceToPay = discountPrice;
  const savePercent = hasDiscount ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;
  
  const imageUrl = product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`;

  return (
    <div className="bg-yellow-100/20 min-h-screen">
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= MAIN SECTION ================= */}
      <section className="w-full bg-yellow-100/20 py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
          {/* LEFT IMAGES */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div className="flex gap-4 mt-6">
              {[imageUrl].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} view ${i+1}`}
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
              Spices › {product.category || "Premium"}
            </p>

            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
              <span className="text-gray-600 text-sm ml-2">
                {product.rating || 4.8} | verified reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">${priceToPay.toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="line-through text-gray-400">${originalPrice.toFixed(2)}</span>
                  <span className="bg-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full">
                    Save {savePercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
              {product.description}
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
                📍 Direct Sourcing
              </div>
              <div className="bg-yellow-300/20 p-4 rounded-xl shadow-sm text-sm">
                🌾 Fresh {new Date().getFullYear()} Harvest
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
                disabled={product.stock && quantity >= product.stock}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.name,
                    price: priceToPay,
                    image: imageUrl,
                    quantity: quantity,
                  })
                }
                disabled={product.stock === 0}
                className={`flex-1 ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-black'} font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition`}
              >
                <ShoppingCart size={18} />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              <button 
                className="flex-1 border-2 border-yellow-500 text-yellow-700 font-semibold py-4 rounded-full hover:bg-yellow-50"
                disabled={product.stock === 0}
              >
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
              Our {product.name} represents the highest grade available.
              Carefully harvested and processed to deliver deep flavors and aromas that transform any dish.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-700">
              Ethical Sourcing
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We source directly from small-scale farms.
              Cutting out middlemen ensures fair compensation and fresher harvests.
            </p>
            <p className="text-yellow-600 text-sm mt-3">
              📍 Authentic Origin
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-700">
              Usage Tips
            </h3>
            <ul className="text-gray-600 text-sm space-y-2 list-disc ml-5">
              <li>Use sparingly to add robust flavors.</li>
              <li>Perfect for curries, marinades & specialty dishes.</li>
              <li>Store in cool, dry place away from sunlight.</li>
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
            <Link to="/products" className="text-yellow-600 font-semibold">
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
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}