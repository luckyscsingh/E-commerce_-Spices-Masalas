import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import aboutmain1 from "../assets/aboutmain1.jpg.webp";
import aboutus1 from "../assets/aboutus1.png";
import aboutus2 from "../assets/aboutus2.png";
import aboutus3 from "../assets/aboutus3.png";
import aboutus4 from "../assets/aboutus4.jpg";

import wayanadblackpepper from "../assets/wayanadblackpepper.png.webp";
import lakadongturmeric from "../assets/lakadongturmeric.webp";
import ceyloncinnamon from "../assets/ceyloncinnamon.jpg.webp";
import wildsaffron from "../assets/wildsaffron.jpg";

function OurStory() {
    const origins = [
        { img: wayanadblackpepper, location: "KERALA, INDIA", title: "Wayanad Black Pepper" },
        { img: lakadongturmeric, location: "MEGHALAYA, INDIA", title: "Lakadong Turmeric" },
        { img: ceyloncinnamon, location: "SRI LANKA", title: "Ceylon Cinnamon" },
        { img: wildsaffron, location: "KASHMIR, INDIA", title: "Wild Saffron" },
    ];

    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="relative h-[90vh]">
                <img src={aboutmain1} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <p className="text-yellow-400 font-semibold mb-3">SINCE 1984</p>
                    <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
                        Sourcing the Soul of Every Kitchen.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-gray-200">
                        From the sun-soaked fields of Kerala to the high altitudes of the
                        Himalayas, we bring you the purest harvest directly from the hands
                        that nurture them.
                    </p>
                </div>
            </section>

            {/* JOURNEY */}
            <section className="py-20 bg-yellow-100/20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            A Journey from Soil to Spices
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Our story began with a simple observation: the spices in our
                        kitchens had lost their voice. Mass production and long supply
                        chains had stripped away the essential oils, the vibrant colors,
                        and the ancestral stories of the land.
                        </p>
                         <p className="text-gray-600 mb-8 leading-relaxed">
                        We decided to change that. By eliminating the middlemen, we
                        partner directly with small-scale farmers who practice
                        regenerative organic agriculture. We visit every farm, taste every harvest, and ensure that the people behind the species are treated with the dignity they deserve.
                    </p>
                        <button className="bg-red-800 text-white px-8 py-3 rounded-full hover:bg-red-900 transition">
                            Explore Our Farms →
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[aboutus1, aboutus2, aboutus3, aboutus4].map((img, i) => (
                            <img key={i} src={img} className="rounded-2xl shadow-lg" />
                        ))}
                    </div>
                </div>
            </section>

            {/* QUALITY */}
            <section className="py-20 bg-yellow-200/20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-6">
                        Our Unwavering Quality Promise
                    </h2>
                    <p className="italic text-gray-600 mb-10">
                        If it’s not organic and potent in flavor, it doesn’t enter our jars.
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-3xl font-bold text-red-800">100%</h3>
                            <p className="text-sm text-gray-500 mt-2">ORGANIC</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-red-800">Direct</h3>
                            <p className="text-sm text-gray-500 mt-2">FARM‑TO‑KITCHEN</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-red-800">No</h3>
                            <p className="text-sm text-gray-500 mt-2">ADDITIVES</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ORIGINS */}
            <section className="py-20 bg-yellow-100/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between mb-12">
                        <h2 className="text-3xl font-bold">The Origins</h2>
                        <button className="text-red-700 font-semibold">View All →</button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {origins.map((item, i) => (
                            <div key={i} className="relative rounded-3xl overflow-hidden group">
                                <img
                                    src={item.img}
                                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-xs text-yellow-400 tracking-widest mb-2">
                                        {item.location}
                                    </p>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-yellow-100/20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-red-700 rounded-3xl py-16 px-6 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Taste the Difference of Direct Sourcing
                        </h2>
                        <p className="text-yellow-200 mb-8 max-w-2xl mx-auto">
                            Join us in supporting sustainable farms and bringing authentic
                        flavors back to your dining table.
                        </p>
                        <button className="bg-white text-red-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                            Browse the Collection
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default OurStory;