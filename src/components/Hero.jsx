import heroImage from "../assets/images/spices-hero.webp";

const Hero = () => {
  return (
    <section className="relative w-full h-[50vh] md:h-[70vh]">

      {/* Background Image */}
      <img
        src={heroImage}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Spices hero"
      />

      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hero Text */}
      <div className="px-4 absolute bottom-10 md:left-10 max-w-7xl mx-auto text-white">
        <span className="text-yellow-500 text-md mb-2 block">
          SINCE 1984
        </span>

        <h1 className="text-2xl md:text-6xl font-bold leading-tight mb-3 max-w-xl">
          Sourcing the Soul of Every Kitchen
        </h1>

        <p className="mt-4 text-sm md:text-lg max-w-xl text-gray-100">
          From the sun-soaked fields of Kerala to the high altitudes of the
          Himalayas, we bring you the purest harvest directly from the hands
          that nurture them.
        </p>
      </div>

    </section>
  );
};

export default Hero;