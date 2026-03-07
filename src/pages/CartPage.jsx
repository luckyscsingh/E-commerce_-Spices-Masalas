import { useCart } from "../context/CartContext";
import { Minus, Plus, ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

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

    return (
        <div className="bg-[#f5f3ee] min-h-screen">

            {/* ================= NAVBAR ================= */}
            <header className="bg-[#f5f3ee] border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                        <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                            ✿
                        </span>
                        SpiceHaven
                    </Link>

                    {/* Center Nav */}
                    <nav className="hidden md:flex gap-8 text-gray-600">
                        <Link to="/">Home</Link>
                        <Link to="/products">Shop</Link>
                        <Link to="#">About</Link>
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-5">

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

            {/* ================= CONTAINER ================= */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                    Your Cart ({cartItems.length})
                </h2>

                {/* ================= GRID ================= */}
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* ================= LEFT: CART ITEMS ================= */}
                    <div className="lg:col-span-2 space-y-6">

                        {cartItems.length === 0 && (
                            <p className="text-gray-500">Your cart is empty.</p>
                        )}

                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                            >
                                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center gap-4 mt-4 bg-gray-100 px-4 py-2 rounded-full w-fit">
                                            <button onClick={() => decreaseQty(item.id)}>
                                                <Minus size={16} />
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button onClick={() => increaseQty(item.id)}>
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4 sm:gap-2 w-full sm:w-auto">
                                    <p className="text-yellow-600 font-semibold text-lg">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-sm text-gray-400 hover:text-red-500 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        <Link
                            to="/products"
                            className="inline-block mt-6 text-yellow-600"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>

                    {/* ================= RIGHT: ORDER SUMMARY ================= */}
                    <div className="bg-[#f3f1eb] border border-yellow-200 rounded-3xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-24">

                        <h3 className="text-2xl font-semibold mb-8 text-gray-900">
                            Order Summary
                        </h3>

                        <div className="space-y-5 text-gray-600 text-[15px]">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-gray-900 font-medium">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-gray-900 font-medium">
                                    $5.00
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax (8%)</span>
                                <span className="text-gray-900 font-medium">
                                    ${(total * 0.08).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="my-8 border-t border-yellow-200" />

                        <div className="flex justify-between items-center mb-8">
                            <span className="text-lg font-semibold text-gray-900">
                                Total
                            </span>
                            <span className="text-3xl font-bold text-yellow-600">
                                ${(total + 5 + total * 0.08).toFixed(2)}
                            </span>
                        </div>

                        <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 rounded-full shadow-md transition">
                            Proceed to Checkout
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}