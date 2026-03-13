import { useState, useEffect } from "react";
import { Truck, Package, Wallet, Smartphone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, token } = useAuth();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shippingMethod === "express" ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!user || !token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!address.fullName || !address.street || !address.city) {
      setError("Please fill in at least your name, street, and city");
      return;
    }

    if (paymentMethod === "COD") {
       await processCODOrder();
    } else {
       await processRazorpayOrder();
    }
  };

  // 1. Process COD directly
  const processCODOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const orderData = {
        items: cartItems.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: address,
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        shippingMethod,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
      };

      const res = await api.post("/api/orders", orderData);

      setLoading(false);
      navigate(`/order-confirmation/${res.data.order._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to place COD order");
    }
  };

  // 2. Process Razorpay Payment Flow
  const processRazorpayOrder = async () => {
    try {
      setLoading(true);
      setError("");

      // Step 2a: Create Razorpay Order from backend
      const { data: { order: razorpayOrder } } = await api.post("/api/payment/create-order", {
        amount: total
      });

      // Step 2b: Setup Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_YourKeyIdHere", // Will be supplied dynamically if needed
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "SpiceHaven",
        description: "Premium Spices Order",
        order_id: razorpayOrder.id,
        handler: async function (response) {
            // Step 2c: Verify payment in backend and create order
            try {
                const orderData = {
                  items: cartItems.map((item) => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                  })),
                  deliveryAddress: address,
                  paymentMethod: paymentMethod === "UPI" ? "UPI" : paymentMethod,
                  paymentStatus: "Paid",
                  shippingMethod,
                  subtotal,
                  shipping: shippingCost,
                  tax,
                  total,
                };

                const verifyRes = await api.post("/api/payment/verify", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderData
                });

                if (verifyRes.data.success) {
                    setLoading(false);
                    navigate(`/order-confirmation/${verifyRes.data.order._id}`);
                }
            } catch (err) {
                setLoading(false);
                setError(err.response?.data?.message || "Payment verification failed");
            }
        },
        prefill: {
            name: address.fullName,
            email: user.email,
            contact: address.phone
        },
        theme: {
            color: "#ca8a04" // yellow-600
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response){
          setLoading(false);
          setError(`Payment Failed: ${response.error.description}`);
      });

      razorpayInstance.open();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to initialize payment gateway");
    }
  };


  return (
    <div className="bg-yellow-100/20 min-h-screen text-gray-900 flex flex-col">

      {/* ================= HEADER ================= */}
      <Navbar />

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-3 gap-12 flex-grow">

        {/* ================= LEFT SECTION ================= */}
        <div className="lg:col-span-2 space-y-12">

          <h2 className="text-3xl sm:text-4xl font-bold">Checkout</h2>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* ================= DELIVERY ADDRESS ================= */}
          <div>
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-6">
              <Truck size={18} /> Delivery Address
            </h3>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="fullName" value={address.fullName} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Johnathan Doe" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input name="street" value={address.street} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="123 Saffron Boulevard" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apartment / Suite</label>
                  <input name="apt" value={address.apt} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Apt 4B" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input name="city" value={address.city} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Mumbai" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                  <input name="state" value={address.state} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="Maharashtra" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postcode</label>
                  <input name="zip" value={address.zip} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="400001" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input name="phone" value={address.phone} onChange={handleAddressChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" placeholder="+91 98765 43210" />
              </div>

            </div>
          </div>

          {/* ================= SHIPPING METHOD ================= */}
          <div className="border-t border-yellow-400/30 pt-10">
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-6">
              <Package size={18} /> Shipping Method
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">

              <div
                onClick={() => setShippingMethod("standard")}
                className={`flex-1 flex items-center justify-between p-4 rounded-2xl border-2 transition ${shippingMethod === "standard" ? "border-yellow-500 bg-yellow-50/50" : "border-gray-200 bg-gray-50/30"}`}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <p className="font-semibold">Standard Shipping</p>
                  <p className="text-sm opacity-80">4‑7 Business Days</p>
                </div>
                <span className="font-semibold">Free</span>
              </div>

              <div
                onClick={() => setShippingMethod("express")}
                className={`flex-1 flex items-center justify-between p-4 rounded-2xl border-2 transition ${shippingMethod === "express" ? "border-yellow-500 bg-yellow-50/50" : "border-gray-200 bg-gray-50/30"}`}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <p className="font-semibold">Express Delivery</p>
                  <p className="text-sm text-gray-500">1‑2 Business Days</p>
                </div>
                <span className="font-semibold">$15.00</span>
              </div>

            </div>
          </div>

          {/* ================= PAYMENT METHOD ================= */}
          <div className="border-t border-yellow-400/30 pt-10">
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-6">
              <Wallet size={18} /> Payment Method
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">

              {/* Cash on Delivery */}
              <button
                onClick={() => setPaymentMethod("COD")}
                className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 font-medium transition ${paymentMethod === "COD" ? "border-yellow-500 bg-yellow-50 text-yellow-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                <Wallet size={18} />
                Cash on Delivery
              </button>

              {/* UPI */}
              <button
                onClick={() => setPaymentMethod("UPI")}
                className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 font-medium transition ${paymentMethod === "UPI" ? "border-yellow-500 bg-yellow-50 text-yellow-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                <Smartphone size={18} />
                Online / UPI / Card
              </button>

            </div>

          </div>

        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg h-fit">

          <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-5">
              <div className="flex gap-4 items-center">
                <img src={item.image} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-sm line-clamp-1 max-w-[150px]">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-yellow-600 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t pt-5 space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span className="text-yellow-600">${total.toFixed(2)}</span>
            </div>

          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full font-semibold transition disabled:opacity-50 mt-8"
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">
            Secure checkout powered by SSL encryption
          </p>

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <Footer/>
    </div>
  );
}