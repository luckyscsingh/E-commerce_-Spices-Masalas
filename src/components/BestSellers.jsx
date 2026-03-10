import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import KASHMIRISAFFRON from "../assets/KASHMIRISAFFRON.jpg.webp";
import redchillipowder from "../assets/redchillipowder.jpg.webp";
import greencardamom from "../assets/greencardamom.jpg";
import corianderseeds from "../assets/corianderseeds.jpg";

function BestSeller() {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const products = [
    {
      id: 1,
      tag: "BLENDS",
      name: "Kashmiri Garam Masala",
      price: "$12.50",
      rating: 4.9,
      image: KASHMIRISAFFRON,
    },
    {
      id: 2,
      tag: "PURITY",
      name: "Organic Turmeric Powder",
      price: "$8.99",
      rating: 4.8,
      image: redchillipowder,
    },
    {
      id: 3,
      tag: "WHOLE",
      name: "Green Cardamom",
      price: "$15.20",
      rating: 4.6,
      image: greencardamom,
    },
    {
      id: 4,
      tag: "SEEDS",
      name: "Coriander Seeds",
      price: "$6.75",
      rating: 4.4,
      image: corianderseeds,
    },
  ];

  return (
    <section className="py-10 md:py-20 px-4 md:px-6 bg-[#f5f3ee]">

      {/* Section Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
        <h2 className="text-xl md:text-4xl font-bold">
          Our Best Sellers
        </h2>
        <span className="text-yellow-600 text-sm md:text-base font-medium">
          See More
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 md:h-60 w-full object-cover"
              />

              {/* Wishlist */}
              <button
                onClick={() => toggleLike(product.id)}
                className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow"
              >
                {liked[product.id] ? (
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
                {product.tag}
              </p>

              {/* Name */}
              <h3 className="mt-1 text-sm md:text-lg font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center text-yellow-500 text-xs md:text-sm mt-1">
                ⭐ {product.rating}
              </div>

              {/* Price + Add */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-base md:text-xl font-bold text-yellow-600">
                  {product.price}
                </p>

                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center text-lg">
                  +
                </button>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default BestSeller;