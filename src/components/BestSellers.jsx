import { useState } from "react";
import { FaHeart,FaRegHeart, FaShoppingCart } from "react-icons/fa";
import KASHMIRISAFFRON from "../assets/KASHMIRISAFFRON.jpg.webp";
import redchillipowder from "../assets/redchillipowder.jpg.webp";
import greencardamom from "../assets/greencardamom.jpg";
import corianderseeds from "../assets/corianderseeds.jpg";

function BestSeller() {
    const [liked, setLiked] = useState({});

    const toggleLike = (id) => {
        setLiked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const products = [
        {
            id: 1,
            name: "Kashmiri Saffron",
            description: "100% Pure Grade A1",
            price: "$12.99",
            rating: 5,
            image: KASHMIRISAFFRON,
        },
        {
            id: 2,
            name: "Red Chilli Powder",
            description: "Spicy & Authentic",
            price: "$8.50",
            rating: 4,
            image: redchillipowder,
        },
        {
            id: 3,
            name: "Green Cardamom",
            description: "Premium Export Quality",
            price: "$15.20",
            rating: 3,
            image: greencardamom,
        },
        {
            id: 4,
            name: "Coriander Seeds",
            description: "Sun-dried and Earthy",
            price: "$6.75",
            rating: 3,
            image: corianderseeds,
        },
    ];

    return (
        <section className="py-20 px-6 bg-yellow-200/20">
            <h2 className="text-4xl font-bold text-center mb-14">
                Best Sellers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-5"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-52 w-full object-cover rounded-xl"
                            />

                            {/* Like Button */}
                            <button
                                onClick={() => toggleLike(product.id)}
                                className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 shadow-md"
                            >
                                {liked[product.id] ? (
                                    <FaHeart className="text-red-500 text-2xl" />
                                ) : (
                                    <FaRegHeart className="text-yellow-500 text-2xl" />
                                )}
                            </button>
                        </div>

                        {/* Rating */}
                        <div className="mt-4 text-yellow-500 text-lg">
                            {"★".repeat(product.rating)}
                            {"☆".repeat(5 - product.rating)}
                        </div>

                        {/* Product Name */}
                        <h3 className="mt-2 font-bold text-lg text-gray-900">
                            {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 text-sm mt-1">
                            {product.description}
                        </p>

                        {/* Price + Add Button Row */}
                        <div className="mt-5 flex items-center justify-between">
                            <p className="text-2xl font-bold text-[#c9a227]">
                                {product.price}
                            </p>

                            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#f3ead7] text-[#c9a227] font-semibold hover:bg-[#eadfc6] transition">
                                <FaShoppingCart />
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BestSeller;