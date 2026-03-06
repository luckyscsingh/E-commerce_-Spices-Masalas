import heroImage from "../assets/images/spices-hero.webp";

const Hero = () => {
  return (
    <section className="relative w-full h-100 md:h-150">
      <img src={heroImage} className="absolute w-full h-150 object-cover" />

      <div className="absolute inset-0 bg-black/10 h-150">
        <div className="absolute bottom-10 left-10 max-w-7xl text-white">
          <span className="text-yellow-500 text-sm mb-2">SINCE 1984</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3 max-w-xl">
            Sourcing the Soul of Every Kitchen
          </h1>

          <p className="mt-4 text-sm md:text-lg max-w-xl text-gray-100">
            From the sun-soaked fields of Kerala to the high altitudes of the
            Himalayas, we bring you the purest harvest directly from the hands
            that nurture them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
