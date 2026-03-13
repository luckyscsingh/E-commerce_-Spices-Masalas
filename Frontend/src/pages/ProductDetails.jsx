import { ShoppingCart, Star, Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import producthero from "../assets/producthero.jpg.avif";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state from API
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const categoriesList = ["Whole Spices", "Ground Masalas", "Organic Spices", "Blends", "Herbs"];

  useEffect(() => {
    fetchProducts();
  }, [currentCategory, currentSearch, pageParam]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (currentCategory) queryParams.append("category", currentCategory);
      if (currentSearch) queryParams.append("search", currentSearch);
      if (pageParam) queryParams.append("page", pageParam);
      queryParams.append("limit", 6); // Set reasonable limit for pagination

      const res = await api.get(`/api/products?${queryParams.toString()}`);
      
      // Handle both flat array or paginated object structure from backend
      if (Array.isArray(res.data)) {
         setProducts(res.data);
         setCurrentPage(1);
         setTotalPages(1);
         setTotalProducts(res.data.length);
      } else if (res.data && res.data.products) {
         setProducts(res.data.products);
         setCurrentPage(res.data.currentPage || 1);
         setTotalPages(res.data.totalPages || 1);
         setTotalProducts(res.data.totalProducts || res.data.products.length);
      } else {
         setProducts([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]);
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
      const newParams = new URLSearchParams(searchParams);
      if (currentCategory === cat) {
          newParams.delete("category");
      } else {
          newParams.set("category", cat);
      }
      newParams.set("page", "1"); // reset to page 1 on filter
      setSearchParams(newParams);
  };

  const clearSearch = () => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("search");
      newParams.set("page", "1");
      setSearchParams(newParams);
  };
  
  const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
          const newParams = new URLSearchParams(searchParams);
          newParams.set("page", newPage);
          setSearchParams(newParams);
          window.scrollTo({ top: 0, behavior: "smooth" });
      }
  };

  return (
    <div className="bg-[#f5f3ee] min-h-screen flex flex-col">
      <Navbar/>

      {/* HERO */}
      <section className="bg-[#f4f1eb] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-[#e6dfd0] rounded-3xl md:rounded-[40px] overflow-hidden grid grid-cols-2 items-center">
            <div className="p-6 md:p-12">
              <h2 className="text-2xl md:text-6xl font-bold text-[#0f172a] leading-tight mb-3 md:mb-6">
                Premium Spice Collection
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                Discover the finest hand-picked spices from across the globe.
              </p>
            </div>
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

      {/* FILTERS & SEARCH FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             {/* Category Pills */}
             <div className="flex flex-wrap gap-2">
                 <button 
                    onClick={() => handleCategoryClick("")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${!currentCategory ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'}`}
                 >
                     All Spices
                 </button>
                 {categoriesList.map(cat => (
                     <button 
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${currentCategory === cat ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'}`}
                     >
                         {cat}
                     </button>
                 ))}
             </div>

             {/* Search Feedback */}
             {currentSearch && (
                 <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm">
                     <Search size={16} />
                     <span>Results for "{currentSearch}"</span>
                     <button onClick={clearSearch} className="ml-2 bg-yellow-200 hover:bg-yellow-300 rounded-full p-1 transition">
                         <X size={14} />
                     </button>
                 </div>
             )}
         </div>
      </section>


      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-6 md:mt-8 
      grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 flex-grow">

        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
            <button 
               onClick={() => { setSearchParams(new URLSearchParams()); }}
               className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-full font-medium hover:bg-yellow-700 transition"
            >
               Clear all filters
            </button>
          </div>
        ) : products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col group"
          >
            <div className="relative">
              <img
                src={product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`}
                className="h-40 sm:h-48 md:h-64 w-full object-cover group-hover:scale-105 transition duration-500"
                alt={product.name}
              />
              {product.badge && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-xs px-2 py-1 rounded-full text-white font-medium shadow-sm z-10">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm md:text-lg leading-snug text-gray-900 group-hover:text-yellow-700 transition">
                  {product.name}
                </h3>
                <div className="hidden md:flex items-center text-yellow-500 text-sm gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                  <Star size={14} fill="currentColor" />
                  <span className="font-medium text-yellow-700">
                    {product.rating || 4.8}
                  </span>
                </div>
              </div>

              <p className="hidden md:block text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-auto pt-4 md:pt-6">
                <div>
                   <p className="text-base md:text-xl font-bold text-yellow-600">
                     ${product.discountPrice || product.basePrice}
                   </p>
                   {product.discountPrice && (
                       <p className="text-xs text-gray-400 line-through">
                           ${product.basePrice}
                       </p>
                   )}
                </div>

                {/* MOBILE BUTTON */}
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
                  className="md:hidden w-9 h-9 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full flex items-center justify-center transition shadow-md active:scale-95 z-10 relative"
                >
                  +
                </button>

                {/* DESKTOP BUTTON */}
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
                  className="hidden md:flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-sm hover:shadow-md active:scale-95 z-10 relative"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* PAGINATION CONTROLS */}
      {!loading && totalPages > 1 && (
         <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 pt-6 w-full flex justify-center items-center gap-4">
             <button 
                 onClick={() => handlePageChange(currentPage - 1)}
                 disabled={currentPage === 1}
                 className={`flex items-center justify-center w-10 h-10 rounded-full transition ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200 shadow-sm hover:text-yellow-600'}`}
             >
                 <ChevronLeft size={20} />
             </button>
             
             <div className="flex gap-2">
                 {[...Array(totalPages)].map((_, i) => (
                     <button
                         key={i + 1}
                         onClick={() => handlePageChange(i + 1)}
                         className={`w-10 h-10 rounded-full font-medium transition flex items-center justify-center ${currentPage === i + 1 ? 'bg-yellow-600 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200 hover:bg-yellow-50'}`}
                     >
                         {i + 1}
                     </button>
                 ))}
             </div>
             
             <button 
                 onClick={() => handlePageChange(currentPage + 1)}
                 disabled={currentPage === totalPages}
                 className={`flex items-center justify-center w-10 h-10 rounded-full transition ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200 shadow-sm hover:text-yellow-600'}`}
             >
                 <ChevronRight size={20} />
             </button>
         </section>
      )}
      
      {/* ADD BOTTOM PADDING WHEN NO PAGINATION */}
      {(!loading && totalPages <= 1 && products.length > 0) && (
         <div className="pb-12"></div>
      )}

      <Footer/>
    </div>
  );
}