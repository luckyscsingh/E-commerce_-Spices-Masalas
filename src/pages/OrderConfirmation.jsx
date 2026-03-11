import { useNavigate } from "react-router-dom";

import {
    CheckCircle,
    Package,
    MapPin,
    Calendar,
    ArrowLeft,
    Mail,
    Truck,
} from "lucide-react";

export default function OrderConfirmation() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f6f3ea] flex flex-col">

            {/* ✅ NAVBAR */}
            <div className="flex justify-between items-center px-8 md:px-16 py-6">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-4 h-4 bg-yellow-600 block"></span>
                    SpiceHaven
                </h1>

                <div className="hidden md:flex gap-10 text-gray-700 font-medium">
                    <button onClick={() => navigate("/products")}>Shop</button>
                    <button onClick={() => navigate("/recipes")}>Recipes</button>
                    <button onClick={() => navigate("/our-story")}>Our Story</button>
                </div>

                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
                    👤
                </div>
            </div>

            {/* ✅ MAIN CONTENT */}
            <div className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-10 w-full">

                {/* ✅ SUCCESS ICON */}
                <div className="flex justify-center">
                    <div className="bg-yellow-100 p-6 rounded-full">
                        <CheckCircle className="text-yellow-600" size={40} />
                    </div>
                </div>

                {/* ✅ TITLE */}
                <h2 className="text-3xl md:text-5xl font-bold text-center mt-6 text-gray-900">
                    Thank You for Your Order!
                </h2>

                <p className="text-center text-gray-600 mt-4">
                    Your aromatic journey begins now. Order{" "}
                    <span className="text-yellow-700 font-semibold">
                        #SH-98231
                    </span>{" "}
                    confirmed on Oct 24, 2023.
                </p>

                {/* ✅ GRID SECTION */}
                <div className="grid md:grid-cols-3 gap-8 mt-14">

                    {/* ✅ LEFT COLUMN */}
                    <div className="md:col-span-2 space-y-8">

                        {/* ✅ ORDER SUMMARY */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                            <h3 className="font-semibold text-lg flex items-center gap-2 mb-6">
                                <Package size={20} /> Order Summary
                            </h3>

                            {/* Product 1 */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5"
                                        alt="turmeric"
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            Organic Lakadong Turmeric
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            200g • Qty: 1
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-yellow-700">₹450</p>
                            </div>

                            {/* Product 2 */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1601050690597-df0568f70950"
                                        alt="saffron"
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            Premium Kashmiri Saffron
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            1g • Qty: 1
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-yellow-700">₹650</p>
                            </div>

                            <div className="border-t pt-6 space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>₹1,100</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p className="text-green-600">Free</p>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900">
                                    <p>Total</p>
                                    <p>₹1,100</p>
                                </div>
                            </div>
                        </div>

                        {/* ✅ WHAT'S NEXT */}
                        <div className="bg-[#efe9dd] rounded-3xl p-8">
                            <h3 className="font-semibold text-lg mb-6">
                                What's Next?
                            </h3>

                            <div className="flex gap-4 mb-6">
                                <Mail className="text-yellow-700" />
                                <div>
                                    <p className="font-medium">Confirmation Email</p>
                                    <p className="text-sm text-gray-600">
                                        We've sent a copy of your receipt to your email address.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Truck className="text-yellow-700" />
                                <div>
                                    <p className="font-medium">Preparation & Shipping</p>
                                    <p className="text-sm text-gray-600">
                                        Our spice masters are carefully packing your items.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ✅ RIGHT COLUMN */}
                    <div className="space-y-6">

                        {/* ✅ DELIVERY CARD */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm">
                            <h3 className="text-yellow-700 font-semibold mb-6 uppercase text-sm">
                                Delivery Details
                            </h3>

                            <div className="flex gap-3 mb-4">
                                <MapPin className="text-gray-500" size={18} />
                                <div className="text-sm text-gray-700">
                                    <p className="font-medium">Rahul Sharma</p>
                                    Apartment 402, Lotus Greens<br />
                                    HSR Layout, Sector 2<br />
                                    Bangalore, Karnataka 560102
                                </div>
                            </div>

                            <div className="flex gap-3 text-sm">
                                <Calendar className="text-gray-500" size={18} />
                                <div>
                                    <p className="text-gray-500">Estimated Delivery</p>
                                    <p className="font-medium text-yellow-700">
                                        Oct 28 – Oct 30, 2023
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ✅ BUTTONS */}

                        <button
                            onClick={() => navigate("/track-order")}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full font-semibold transition"
                        >
                            Track Order
                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="w-full border border-yellow-600 text-yellow-700 py-4 rounded-full font-semibold hover:bg-yellow-50 transition flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </button>

                        {/* ✅ COMMUNITY CARD */}
                        <div className="bg-gradient-to-br from-red-700 to-red-900 text-white rounded-3xl p-8 shadow-lg">
                            <h3 className="text-lg font-semibold mb-3">
                                Join the Community
                            </h3>
                            <p className="text-sm mb-4 text-red-100">
                                Get exclusive recipes, spice pairings, and 10% off your next hunt.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="flex-1 px-4 py-2 rounded-l-full text-black outline-none"
                                />
                                <button className="bg-yellow-500 px-4 rounded-r-full">
                                    →
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ✅ FOOTER */}
            <div className="text-center text-sm text-gray-500 py-6">
                © 2023 SpiceHaven Artisanal India. All rights reserved.
            </div>
        </div>
    );
}