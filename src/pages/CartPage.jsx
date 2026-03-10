import { useCart } from "../context/CartContext";
import { Minus, Plus, ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import cardamom from "../assets/greencardamom.jpg";
import redchilli from "../assets/redchillipowder.jpg.webp";
import cumin from "../assets/cuminseeds.png.webp";
import cinnamon from "../assets/ceyloncinnamon.jpg.webp";

export default function CartPage() {
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const relatedProducts = [
        { id: 1, name: "Green Cardamom Pods", price: "$14.50", image: cardamom },
        { id: 2, name: "Kashmiri Red Chilli", price: "$9.00", image: redchilli },
        { id: 3, name: "Cumin Seeds (Jeera)", price: "$7.25", image: cumin },
        { id: 4, name: "Ceylon Cinnamon Sticks", price: "$11.00", image: cinnamon },
    ];

    return (
        <div className="bg-[#f5f3ee] min-h-screen flex flex-col">

            {/* ================= NAVBAR ================= */}
            <header className="bg-[#f5f3ee] border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

                    <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                        <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                            ✿
                        </span>
                        SpiceHaven
                    </Link>

                    <nav className="hidden md:flex gap-8 text-gray-600">
                        <Link to="/">Home</Link>
                        <Link to="/products">Shop</Link>
                        <Link to="/our-story">About</Link>
                    </nav>

                    <div className="flex items-center gap-4 sm:gap-5">
                        <Search size={20} className="text-gray-600 cursor-pointer" />

                        <Link to="/cart" className="relative">
                            <ShoppingCart size={22} className="text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-white px-1.5 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <User size={20} className="text-gray-600 cursor-pointer" />
                    </div>
                </div>
            </header>

            {/* ================= MAIN CONTENT ================= */}
            <div className="flex-grow">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                        Your Cart ({cartItems.length})
                    </h2>

                    <div className="grid lg:grid-cols-3 gap-8 sm:gap-10">

                        {/* ================= LEFT: CART ITEMS ================= */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

                            {cartItems.length === 0 && (
                                <p className="text-gray-500">Your cart is empty.</p>
                            )}

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm flex flex-row sm:flex-row items-center justify-between gap-4 sm:gap-6"
                                >
                                    {/* LEFT SIDE */}
                                    <div className="flex items-center gap-4 flex-1">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
                                        />

                                        <div>
                                            <h3 className="font-semibold text-sm sm:text-lg">
                                                {item.name}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-3 bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit text-sm">
                                                <button onClick={() => decreaseQty(item.id)}>
                                                    <Minus size={14} />
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button onClick={() => increaseQty(item.id)}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className="flex flex-col items-end gap-2">
                                        <p className="text-yellow-600 font-semibold text-sm sm:text-lg">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-xs sm:text-sm text-gray-400 hover:text-red-500 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <Link
                                to="/products"
                                className="inline-block mt-4 sm:mt-6 text-yellow-600 text-sm sm:text-base"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>

                        {/* ================= RIGHT: ORDER SUMMARY ================= */}
                        <div className="bg-[#f3f1eb] border border-yellow-200 rounded-3xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-24 h-fit">

                            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-gray-900">
                                Order Summary
                            </h3>

                            <div className="space-y-4 sm:space-y-5 text-gray-600 text-sm sm:text-base">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900 font-medium">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-medium">$5.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax (8%)</span>
                                    <span className="text-gray-900 font-medium">
                                        ${(total * 0.08).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="my-6 sm:my-8 border-t border-yellow-200" />

                            <div className="flex justify-between items-center mb-6 sm:mb-8">
                                <span className="text-base sm:text-lg font-semibold text-gray-900">
                                    Total
                                </span>
                                <span className="text-2xl sm:text-3xl font-bold text-yellow-600">
                                    ${(total + 5 + total * 0.08).toFixed(2)}
                                </span>
                            </div>

                            <Link to="/checkout">
                                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 rounded-full shadow-md transition">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* ================= RELATED PRODUCTS ================= */}
                <section className="bg-[#f3f1eb] py-10 sm:py-16 mt-10 sm:mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">

                        <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-8 sm:mb-12">
                            Pairs well with...
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">

                            {relatedProducts.map((item) => (
                                <div key={item.id} className="group">

                                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-40 sm:h-48 md:h-72 object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    <h4 className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                                        {item.name}
                                    </h4>

                                    <p className="mt-1 text-sm sm:text-base md:text-lg font-semibold text-yellow-600">
                                        {item.price}
                                    </p>

                                </div>
                            ))}

                        </div>
                    </div>
                </section>

            </div>

            {/* ================= FOOTER ================= */}
            <footer className="bg-[#f3f1eb] border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center">

                    <div className="flex items-center justify-center gap-2 text-yellow-600 font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                        <span className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs sm:text-sm">
                            ✿
                        </span>
                        Spices & Masalas
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm">
                        © 2024 Spices & Masalas Co. Crafted for authentic flavor.
                    </p>

                </div>
            </footer>

        </div>
    );
}