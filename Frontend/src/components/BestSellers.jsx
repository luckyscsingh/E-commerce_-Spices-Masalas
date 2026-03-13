import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function BestSeller() {
  const [liked, setLiked] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/products');
        
        // Handle both paginated object and simple array
        const productsData = Array.isArray(res.data) ? res.data : (res.data.products || []);
        
        // slice first 4 products to mock best sellers
        setProducts(productsData.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch best sellers", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-10 md:py-20 px-4 md:px-6 bg-[#f5f3ee]">
      {/* Section Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
        <h2 className="text-xl md:text-4xl font-bold">
          Our Best Sellers
        </h2>
        <Link to="/products" className="text-yellow-600 text-sm md:text-base font-medium">
          See More
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden block relative"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-40 md:h-60 w-full object-cover"
                />

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLike(product._id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow z-10"
                >
                  {liked[product._id] ? (
                    <FaHeart className="text-yellow-500 text-sm md:text-lg" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-sm md:text-lg" />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Tag */}
                <p className="text-[10px] md:text-xs text-yellow-600 font-semibold uppercase">
                  {product.category || "SPICE"}
                </p>

                {/* Name */}
                <h3 className="mt-1 text-sm md:text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center text-yellow-500 text-xs md:text-sm mt-1 gap-1">
                  ⭐ <span>{product.rating || 4.8}</span>
                </div>

                {/* Price + Add */}
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-base md:text-xl font-bold text-yellow-600">
                    ${product.discountPrice || product.basePrice}
                  </p>

                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({
                        id: product._id,
                        name: product.name,
                        price: product.discountPrice || product.basePrice,
                        image: product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`,
                        quantity: 1
                      });
                    }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center text-lg z-10"
                  >
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default BestSeller;