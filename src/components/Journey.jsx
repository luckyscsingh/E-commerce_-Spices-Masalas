import spice from "../assets/images/spice1.webp";
import farmer from "../assets/images/farmer.webp";
import plantation from "../assets/images/plantation.webp";
import chilli from "../assets/images/chilli.webp";

const Journey = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* TEXT */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-100 p-2 rounded-md">🚜</span>
            <span className="text-sm text-gray-500 uppercase">
              Our Legacy
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-4">
            A Journey from Soil to Spices
          </h2>

          <p className="text-gray-600 mb-4">
            Our story began with a simple observation: the spices in our kitchens
            had lost their voice. Mass production and long supply chains had
            stripped away the essential oils, the vibrant colors, and the
            ancestral stories of the land.
          </p>

          <p className="text-gray-600 mb-6">
            We decided to change that. By eliminating the middleman, we partner
            directly with small-scale farmers who practice regenerative organic
            agriculture.
          </p>

          <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700">
            Explore Our Farms →
          </button>
        </div>


        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 gap-6 auto-rows-[150px]">

          {/* Image 1 */}
          <img
            src={spice}
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />

          {/* Image 2 */}
          <img
            src={farmer}
            className="row-span-2 rounded-xl shadow-lg object-cover w-full h-full"
          />

          {/* Image 3 */}
          <img
            src={plantation}
            className="row-span-2 rounded-xl shadow-lg object-cover w-full h-full"
          />

          {/* Image 4 */}
          <img
            src={chilli}
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />

        </div>

      </div>

    </section>
  );
};

export default Journey;