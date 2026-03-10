import heroImg from "../assets/Hero.jpg.avif";

function Hero() {
  return (
    <section className="bg-[#f5f3ee] md:bg-black">

      <div className="max-w-7xl mx-auto md:max-w-none px-4 md:px-0">

        {/* Hero Container */}
        <div className="relative h-[320px] sm:h-[360px] md:h-[720px] md:rounded-none rounded-3xl overflow-hidden">

          {/* Background Image */}
          <img
            src={heroImg}
            alt="Indian Spices"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* ✅ Strong Cinematic Gradient Overlay (Like Image) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end md:justify-center items-start md:items-center h-full text-white p-5 md:px-6 md:text-center">

            {/* Premium Badge */}
            <span className="text-yellow-400 text-[10px] md:text-sm px-5 py-2 rounded-full mb-4 
              bg-yellow-500/10 border border-yellow-400/40 
              w-fit md:mx-auto tracking-[2px] uppercase font-medium">
              Premium Quality
            </span>

            {/* ✅ Heading (Exact Bold Look) */}
            <h2 className="text-xl sm:text-2xl md:text-7xl font-extrabold leading-tight md:leading-[1.05] tracking-tight">
              Pure & Authentic <br />
              <span className="text-yellow-500 font-extrabold">
                Indian Spices
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-sm md:max-w-2xl mt-3 md:mt-6 text-gray-300 text-xs sm:text-sm md:text-lg md:mx-auto leading-relaxed">
              Experience the rich heritage of Indian flavors delivered to your doorstep.
              Sourced directly from local farmers across the subcontinent.
            </p>

            {/* Buttons */}
            <div className="mt-5 md:mt-10 flex flex-row gap-3 md:gap-6 md:justify-center">

              <button className="flex-1 md:flex-none md:px-10 md:py-4 bg-yellow-500 text-black hover:bg-yellow-600 px-5 py-2.5 rounded-full font-semibold transition text-sm md:text-lg shadow-xl">
                Shop Now
              </button>

              <button className="flex-1 md:flex-none md:px-10 md:py-4 rounded-full 
                bg-white/10 backdrop-blur-md 
                border border-white/30 
                hover:bg-white/20 transition text-sm md:text-lg">
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