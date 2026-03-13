import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import wholespices from "../assets/wholespices.jpeg";
import groundmasala from "../assets/groundmasala.jpeg";
import organicspices from "../assets/organicspices.jpg.webp";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/products/categories");
        // Endpoint returns ["Whole Spices", "Ground Masalas", ...]
        const fallbackImages = [wholespices, groundmasala, organicspices];
        
        const formattedCategories = res.data.map((cat, index) => ({
            title: cat,
            img: fallbackImages[index % fallbackImages.length] 
        }));
        
        setCategories(formattedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategories([
            { title: "Whole Spices", img: wholespices },
            { title: "Ground Masalas", img: groundmasala },
            { title: "Organic Spices", img: organicspices },
        ]);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/products?category=${encodeURIComponent(categoryTitle)}`);
  };

  return (
    <section className="bg-[#f5f3ee] py-10 md:py-20">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 md:mb-10">

          <div>
            <h3 className="text-xl md:text-2xl font-bold">
              Shop by Category
            </h3>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Explore our curated collections of exotic aromatics
            </p>
          </div>

          {/* ✅ Responsive View All */}
          <button onClick={() => navigate("/products")} className="text-yellow-600 text-sm md:text-base font-medium whitespace-nowrap">
            View All →
          </button>

        </div>

        {loading ? (
           <div className="flex justify-center py-10">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
           </div>
        ) : (
            <div className={`grid grid-cols-2 ${categories.length >= 3 ? 'md:grid-cols-3' : ''} gap-3 md:gap-8`}>
            
              {categories.slice(0, 3).map((cat, i) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(cat.title)}
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-sm hover:shadow-md transition cursor-pointer"
                >
            
                  {/* Image */}
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="h-28 md:h-72 w-full object-cover group-hover:scale-105 transition duration-500"
                  />
            
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 md:bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            
                  {/* Title */}
                  <h4 className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white text-xs md:text-lg font-semibold pointer-events-none">
                    {cat.title}
                  </h4>
            
                </div>
              ))}
            
            </div>
        )}

      </div>
    </section>
  );
}

export default Categories;