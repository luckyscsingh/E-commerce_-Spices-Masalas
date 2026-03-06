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
    <section className="max-w-8xl bg-yellow-100/20 mx-auto px-6 py-20">
      <h3 className="text-2xl font-bold mb-2">Shop by Category</h3>
<h4 className="text-1xl mb-10">Explore our curated collections of exotix aromatics</h4>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden group">
            <img src={cat.img} className="h-72 w-full object-cover group-hover:scale-110 transition duration-500" />
            <div className="absolute inset-0 bg-black/40"></div>
            <h4 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
              {cat.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;