import heroImg from "../assets/Hero.jpg.avif";

function Hero() {
  return (
    <section className="bg-[#f5f3ee] py-4 md:py-0">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Hero Card */}
        <div className="relative h-[320px] sm:h-[360px] md:h-[600px] rounded-3xl md:rounded-none overflow-hidden">

          {/* Image */}
          <img
            src={heroImg}
            alt="Indian Spices"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end md:justify-center h-full text-white p-5 md:px-12 md:text-center">

            {/* Premium Badge */}
            <span className="text-yellow-400 text-[10px] md:text-xs px-4 py-1.5 rounded-full mb-3 
              bg-yellow-500/20 backdrop-blur-md border border-yellow-400/40 w-fit md:mx-auto">
              PREMIUM QUALITY
            </span>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-5xl font-bold leading-tight">
              Pure & Authentic <br />
              <span className="text-yellow-500">Indian Spices</span>
            </h2>

            {/* Description */}
            <p className="max-w-sm md:max-w-xl mt-2 md:mt-4 text-gray-200 text-xs sm:text-sm md:text-base">
              Experience the rich heritage of Indian flavors delivered to your doorstep.
            </p>

            {/* ✅ Buttons (Side by Side on Mobile) */}
            <div className="mt-4 md:mt-6 flex flex-row gap-3 md:gap-4 md:justify-center">

              <button className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600 px-5 py-2.5 md:px-6 md:py-2 rounded-full font-semibold transition text-sm md:text-base">
                Shop Now
              </button>

              <button className="flex-1 px-5 py-2.5 md:px-6 md:py-2 rounded-full 
                bg-white/10 backdrop-blur-md 
                border border-white/30 
                hover:bg-white/20 transition text-sm md:text-base">
                View Recipes
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;