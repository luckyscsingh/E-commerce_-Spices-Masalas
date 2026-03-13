import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Gift,
} from "lucide-react";

export default function TrackOrder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
        try {
            const res = await api.get(`/api/orders/${id}`);
            setOrder(res.data.order || res.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch order", err);
            setError("Unable to track this order.");
            setLoading(false);
        }
    };
    fetchOrder();
  }, [id]);

  const steps = [
    { label: "Placed", icon: CheckCircle, status: "Processing" },
    { label: "Processing", icon: Package, status: "Shipped" }, // If it's shipped, it's past processing
    { label: "Shipped", icon: Truck, status: "Out for Delivery" }, // If it's out for delivery, it's past shipped
    { label: "Out for Delivery", icon: MapPin, status: "Delivered" },
    { label: "Delivered", icon: CheckCircle, status: "Delivered" },
  ];

  let currentStep = 0;
  if (order) {
      if (order.orderStatus === "Delivered") currentStep = 4;
      else if (order.orderStatus === "Out for Delivery") currentStep = 3;
      else if (order.orderStatus === "Shipped") currentStep = 2;
      else if (order.orderStatus === "Processing") currentStep = 0; // Or 1 depending on logic
      else currentStep = 0; // Default or Processing
      
      // Fine tune for visual: if shipped, processing is done
      if (order.orderStatus === "Shipped") currentStep = 2; 
  }

  const progressWidth = `${(currentStep / (steps.length - 1)) * 100}%`;

  if (loading) {
      return (
          <div className="min-h-screen bg-yellow-100/20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
          </div>
      );
  }

  if (error || !order) {
       return (
           <div className="min-h-screen bg-yellow-100/20 flex flex-col items-center justify-center space-y-4">
               <p className="text-xl font-semibold">{error || "Order not found"}</p>
               <button onClick={() => navigate("/")} className="text-yellow-600 underline">Return Home</button>
           </div>
       );
  }

  const { shippingAddress, items, subtotal, shipping, total, createdAt, orderStatus } = order;

  const orderDate = new Date(createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
  });

  // Estimate delivery
  const deliveryDate = new Date(createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-yellow-100/20 flex flex-col">

      {/* ================= HEADER + ACTION BUTTONS ================= */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex-grow">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Track Your Order
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1 break-all">
              Order ID: #{order._id} · Placed on {orderDate}
            </p>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/support")}
              className="w-full sm:w-auto border border-gray-300 px-5 py-2 rounded-full text-sm font-medium bg-white hover:bg-gray-50 transition"
            >
              Need Help?
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
            >
              Continue Shopping →
            </button>
          </div>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">

          {/* ================= LEFT COLUMN ================= */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">

            {/* ✅ STATUS CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      orderStatus === "Delivered" ? "bg-green-100 text-green-700" :
                      orderStatus === "Cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                  }`}>
                    {orderStatus}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mt-2">
                    {orderStatus === "Delivered" ? "Successfully Delivered" : 
                     orderStatus === "Cancelled" ? "Order Cancelled" : 
                     "Arriving Soon"}
                  </h3>
                </div>

                {orderStatus !== "Cancelled" && (
                    <div className="sm:text-right">
                      <p className="text-gray-500 text-xs sm:text-sm uppercase">
                        {orderStatus === "Delivered" ? "DELIVERED ON" : "ESTIMATED DELIVERY"}
                      </p>
                      <p className="font-semibold text-sm sm:text-base">
                        {orderStatus === "Delivered" ? "Check tracking history" : deliveryDateStr}
                      </p>
                    </div>
                )}
              </div>

              {/* ✅ PROGRESS BAR */}
              <div className="relative">

                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                <div
                  className={`absolute top-4 left-0 h-1 rounded-full transition-all duration-700 ${orderStatus === "Cancelled" ? 'bg-red-500' : 'bg-yellow-600'}`}
                  style={{ width: progressWidth }}
                ></div>

                <div className="relative flex justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const active = index <= currentStep;
                    const isCancelled = orderStatus === "Cancelled";

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center w-12 sm:w-20"
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 bg-white transition-colors duration-500 ${
                            active
                              ? isCancelled && index === currentStep ? "border-red-500 text-red-500" : "border-yellow-600 text-yellow-600 bg-yellow-50"
                              : "border-gray-200 text-gray-300"
                          }`}
                        >
                          <Icon size={16} className={active && (!isCancelled || index !== currentStep) ? "text-yellow-600" : ""} />
                        </div>

                        <p
                          className={`mt-2 text-[10px] sm:text-xs font-medium ${
                            active
                              ? isCancelled && index === currentStep ? "text-red-600" : "text-gray-800"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ✅ MAP */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
              <iframe
                title="tracking-map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(shippingAddress.city + ' ' + shippingAddress.state)}&output=embed`}
                className="w-full h-52 sm:h-72 rounded-xl sm:rounded-2xl border-0"
                loading="lazy"
              ></iframe>

              <button
                onClick={() =>
                  window.open(`https://maps.google.com/?q=${encodeURIComponent(shippingAddress.street + ' ' + shippingAddress.city + ' ' + shippingAddress.state)}`, "_blank")
                }
                className="mt-4 sm:mt-6 w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 transition text-white px-6 py-3 rounded-full text-sm font-semibold"
              >
                Track on Map
              </button>
            </div>

            {/* ✅ SHIPMENT HISTORY */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-5">
                Shipment History
              </h3>

              <div className="space-y-5 text-sm">
                
                {orderStatus === "Delivered" && (
                     <div className="relative pl-6 border-l-2 border-yellow-500 pb-2">
                     <span className="absolute -left-[9px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></span>
                     <p className="font-medium">
                       Delivered
                     </p>
                     <p className="text-gray-500 text-xs sm:text-sm">
                       {shippingAddress.city}, {shippingAddress.state}
                     </p>
                   </div>
                )}

                {(orderStatus === "Out for Delivery" || orderStatus === "Delivered") && (
                     <div className="relative pl-6 border-l-2 border-yellow-500 pb-2">
                     <span className="absolute -left-[9px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></span>
                     <p className="font-medium">
                       Out for Delivery
                     </p>
                     <p className="text-gray-500 text-xs sm:text-sm">
                       Local Courier Facility
                     </p>
                   </div>
                )}

                {(orderStatus === "Shipped" || orderStatus === "Out for Delivery" || orderStatus === "Delivered") && (
                     <div className="relative pl-6 border-l-2 border-yellow-500 pb-2">
                     <span className="absolute -left-[9px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></span>
                     <p className="font-medium">
                       Shipped from Hub
                     </p>
                     <p className="text-gray-500 text-xs sm:text-sm">
                       Distribution Center
                     </p>
                   </div>
                )}

                <div className="relative pl-6 border-l-2 border-yellow-500 pb-2">
                   <span className="absolute -left-[9px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></span>
                   <p className="font-medium">
                     Processing at Facility
                   </p>
                   <p className="text-gray-500 text-xs sm:text-sm">
                     Preparing your items
                   </p>
                 </div>

                <div className="relative pl-6 border-l-2 border-transparent pb-2">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 bg-yellow-500 rounded-full border-4 border-white"></span>
                  <p className="font-medium">
                    Order Placed & Confirmed
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {orderDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-6 md:space-y-8">

            {/* ✅ SHIPPING CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-3 uppercase text-xs text-gray-500 tracking-wider">
                Shipping To
              </h3>

              <p className="font-medium text-sm text-gray-900">
                {shippingAddress.fullName}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                {shippingAddress.street} {shippingAddress.apt}
                <br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                <br />
                India
                <br />
                {shippingAddress.phone}
              </p>
            </div>

            {/* ✅ ORDER SUMMARY */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-5 text-sm uppercase text-gray-500 tracking-wider">
                ORDER SUMMARY ({items.length} ITEM{items.length !== 1 && 'S'})
              </h3>

              <div className="space-y-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <img
                      src={item.image?.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover bg-gray-50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-medium">
                  <p>Shipping</p>
                  <p className={shipping === 0 ? "text-green-600" : "text-gray-900"}>
                     {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t text-base font-bold text-gray-900">
                  <p>Total Paid</p>
                  <p className="text-yellow-600">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* ✅ REFERRAL */}
            <div className="bg-yellow-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center border border-yellow-100">
              <Gift className="mx-auto text-yellow-600 mb-3" size={24} />
              <h4 className="font-semibold text-sm text-gray-900">
                Share the Flavor
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Refer a friend and get 20% off your next order.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-4 w-full border border-yellow-200 hover:bg-yellow-50 text-yellow-800 transition px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm"
              >
                Get Referral Link
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* ✅ FOOTER */}
      <div className="text-center text-sm text-gray-500 py-6 mt-auto">
          © {new Date().getFullYear()} SpiceHaven Artisanal India. All rights reserved.
      </div>
    </div>
  );
}