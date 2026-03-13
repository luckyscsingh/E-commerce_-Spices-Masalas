import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

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
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/orders/${id}`);
                // the backend returns { success: true, order: {...} }
                setOrder(res.data.order || res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch order", err);
                setError("Unable to load order details.");
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6f3ea] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
        );
    }

    if (error || !order) {
         return (
             <div className="min-h-screen bg-[#f6f3ea] flex flex-col items-center justify-center space-y-4">
                 <p className="text-xl font-semibold">{error || "Order not found"}</p>
                 <button onClick={() => navigate("/")} className="text-yellow-600 underline">Return Home</button>
             </div>
         );
    }

    const { shippingAddress, items, subtotal, tax, shipping, total, createdAt } = order;
    
    // Format date securely
    const orderDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Estimate delivery (e.g. 4 days from order date)
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#f6f3ea] flex flex-col">

            {/* ✅ NAVBAR */}
            <div className="flex justify-between items-center px-8 md:px-16 py-6">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <span className="w-4 h-4 bg-yellow-600 block rounded-sm"></span>
                    SpiceHaven
                </h1>

                <div className="hidden md:flex gap-10 text-gray-700 font-medium">
                    <button onClick={() => navigate("/products")}>Shop</button>
                    <button onClick={() => navigate("/recipes")}>Recipes</button>
                    <button onClick={() => navigate("/our-story")}>Our Story</button>
                </div>

                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center">
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
                    <span className="text-yellow-700 font-semibold break-all">
                        #{order._id}
                    </span>{" "}
                    confirmed on {orderDate}.
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

                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center mb-6">
                                    <div className="flex gap-4">
                                        <img
                                            src={item.image?.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-yellow-700">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}

                            <div className="border-t pt-6 space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>${subtotal.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Tax</p>
                                    <p>${tax.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t mt-2">
                                    <p>Total</p>
                                    <p>${total.toFixed(2)}</p>
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
                                <div className="text-sm text-gray-700 break-words">
                                    <p className="font-medium">{shippingAddress.fullName}</p>
                                    {shippingAddress.street} {shippingAddress.apt}<br />
                                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}<br />
                                    Phone: {shippingAddress.phone}
                                </div>
                            </div>

                            <div className="flex gap-3 text-sm">
                                <Calendar className="text-gray-500" size={18} />
                                <div>
                                    <p className="text-gray-500">Estimated Delivery</p>
                                    <p className="font-medium text-yellow-700">
                                        By {deliveryDateStr}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ✅ BUTTONS */}
                        <button
                            onClick={() => navigate(`/track-order/${order._id}`)}
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
                                <button className="bg-yellow-500 px-4 rounded-r-full font-bold text-black text-xl flex items-center justify-center pb-1">
                                    →
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ✅ FOOTER */}
            <div className="text-center text-sm text-gray-500 py-6">
                © {new Date().getFullYear()} SpiceHaven Artisanal India. All rights reserved.
            </div>
        </div>
    );
}