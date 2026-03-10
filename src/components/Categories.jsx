import wholespices from "../assets/wholespices.jpeg";
import groundmasala from "../assets/groundmasala.jpeg";
import organicspices from "../assets/organicspices.jpg.webp";

function Categories() {
  const categories = [
    { title: "Whole Spices", img: wholespices },
    { title: "Ground Masalas", img: groundmasala },
    { title: "Organic Spices", img: organicspices },
  ];

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
          <button className="text-yellow-600 text-sm md:text-base font-medium whitespace-nowrap">
            View All →
          </button>

        </div>

        {/* ✅ Always 3 in one row */}
        <div className="grid grid-cols-3 gap-3 md:gap-8">

          {categories.map((cat, i) => (
            <div
              key={i}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden group shadow-sm hover:shadow-md transition"
            >

              {/* Image */}
              <img
                src={cat.img}
                className="h-28 md:h-72 w-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 md:bg-black/40"></div>

              {/* Title */}
              <h4 className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white text-xs md:text-lg font-semibold">
                {cat.title}
              </h4>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;