import heroImg from "../assets/Hero.jpg.avif";

function Hero() {
    return (
        <section className="relative h-[600px]">
            <img
                src={heroImg}
                alt="Indian Spices"
                className="absolute w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

                {/* Premium Badge */}
                <span className="text-yellow-400 text-xs px-5 py-2 rounded-full mb-4 
                         bg-yellow-500/10 backdrop-blur-md border border-yellow-400/30">
                    PREMIUM QUALITY
                </span>

                <h2 className="text-5xl font-bold leading-tight">
                    Pure & Authentic <br />
                    <span className="text-yellow-500">Indian Spices</span>
                </h2>

                <p className="max-w-xl mt-4 text-gray-200">
                    Experience the rich heritage of Indian flavors delivered to your doorstep. Sourced directly from local farmers across the subcontinent.
                </p>

                <div className="mt-6 flex gap-4">
                    <button className="bg-yellow-500 text-black hover:bg-yellow-600 px-6 py-2 rounded-full font-semibold transition">
                        Shop Now
                    </button>

                    {/* View Recipes Blur Button */}
                    <button className="px-6 py-2 rounded-full 
                             bg-white/10 backdrop-blur-md 
                             border border-white/30 
                             hover:bg-white/20 transition">
                        View Recipes
                    </button>
                </div>

            </div>
        </section>
    );
}

export default Hero;