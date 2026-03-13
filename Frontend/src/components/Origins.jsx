import pepper from "../assets/images/pepper.webp";
import turmeric from "../assets/images/turmeric.webp";
import cinnamon from "../assets/images/cinnamon.webp";
import saffron from "../assets/images/saffron.webp";

const Origins = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">The Origins</h2>
        <span className="text-gray-500">
          The places and people that makes our spices special.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={pepper} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-25 left-4 text-white">
            <p className="text-xs text-yellow-500">KERALA, INDIA</p>
            <h3 className="text-lg font-semibold">Wayanad Black Pepper</h3>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={turmeric} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-25 left-4 text-white">
            <p className="text-xs text-yellow-500">MEGHALAYA, INDIA</p>
            <h3 className="text-lg font-semibold">Lakadong Turmeric</h3>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={cinnamon} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-25 left-4 text-white">
            <p className="text-xs text-yellow-500">SRI LANKA</p>
            <h3 className="text-lg font-semibold">Ceylon Cinnamon</h3>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={saffron} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-25 left-4 text-white">
            <p className="text-xs text-yellow-500">KASHMIR, INDIA</p>
            <h3 className="text-lg font-semibold">Wild Saffron</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origins;
