import pepper from "../assets/images/pepper.webp";
import turmeric from "../assets/images/turmeric.webp";
import cinnamon from "../assets/images/cinnamon.webp";
import saffron from "../assets/images/saffron.webp";

const Origins = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">The Origins</h2>
        <span className="text-gray-500">The places and people that makes our spices special.</span>
      </div>

      <div className="grid md:grid-cols-4 gap-10">
        <div className="rounded-xl overflow-hidden shadow">
          <img src={pepper} />
          <div className="p-4">
            <h3 className="font-semibold">Wayanad Black Pepper</h3>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow">
          <img src={turmeric} />
          <div className="p-4">
            <h3 className="font-semibold">Lakadong Turmeric</h3>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow">
          <img src={cinnamon} />
          <div className="p-4">
            <h3 className="font-semibold">Ceylon Cinnamon</h3>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow">
          <img src={saffron} />
          <div className="p-4">
            <h3 className="font-semibold">Wild Saffron</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Origins;
