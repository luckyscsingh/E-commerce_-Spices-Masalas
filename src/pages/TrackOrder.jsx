import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Gift,
} from "lucide-react";

export default function TrackOrder() {
  const navigate = useNavigate();
  const [currentStep] = useState(2);

  const steps = [
    { label: "Placed", icon: CheckCircle },
    { label: "Processing", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Out for Delivery", icon: MapPin },
    { label: "Delivered", icon: CheckCircle },
  ];

  const progressWidth = `${(currentStep / (steps.length - 1)) * 100}%`;

  return (
    <div className="min-h-screen bg-yellow-100/20 flex flex-col">

      {/* ================= HEADER + ACTION BUTTONS ================= */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Track Your Order
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Order ID: #SH-9823412 · Placed on Oct 08, 2023
            </p>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/support")}
              className="w-full sm:w-auto border border-gray-300 px-5 py-2 rounded-full text-sm font-medium bg-white"
            >
              Need Help?
            </button>

            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-full text-sm font-medium"
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
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                    IN TRANSIT
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold mt-2">
                    Arriving Soon
                  </h3>
                </div>

                <div className="sm:text-right">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    ESTIMATED DELIVERY
                  </p>
                  <p className="font-semibold text-sm sm:text-base">
                    Thursday, Oct 12th
                  </p>
                </div>
              </div>

              {/* ✅ PROGRESS BAR */}
              <div className="relative">

                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                <div
                  className="absolute top-4 left-0 h-1 bg-yellow-600 rounded-full transition-all duration-700"
                  style={{ width: progressWidth }}
                ></div>

                <div className="relative flex justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const active = index <= currentStep;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center text-center w-12 sm:w-20"
                      >
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 ${
                            active
                              ? "bg-yellow-600 border-yellow-600 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          }`}
                        >
                          <Icon size={16} />
                        </div>

                        <p
                          className={`mt-2 text-[10px] sm:text-xs ${
                            active
                              ? "text-yellow-700 font-medium"
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
                src="https://www.google.com/maps?q=Memphis,TN&output=embed"
                className="w-full h-52 sm:h-72 rounded-xl sm:rounded-2xl"
                loading="lazy"
              ></iframe>

              <button
                onClick={() =>
                  window.open("https://maps.google.com", "_blank")
                }
                className="mt-4 sm:mt-6 w-full sm:w-auto bg-yellow-600 text-white px-6 py-3 rounded-full text-sm"
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
                <div>
                  <p className="font-medium">
                    Arrived at Distribution Center
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Memphis, TN · Oct 10 · 02:45 PM
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Departed Processing Facility
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Louisville, KY · Oct 09
                  </p>
                </div>

                <div>
                  <p className="font-medium">
                    Order Placed & Confirmed
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    Oct 08
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-6 md:space-y-8">

            {/* ✅ SHIPPING CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-3 uppercase text-xs">
                Shipping To
              </h3>

              <p className="font-medium text-sm">
                James Sterling
              </p>
              <p className="text-gray-600 text-xs sm:text-sm mt-2">
                742 Evergreen Terrace
                <br />
                Springfield, IL 62704
                <br />
                United States
                <br />
                +1 (555) 012–3456
              </p>
            </div>

            {/* ✅ ORDER SUMMARY */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-semibold mb-5 text-sm">
                ORDER SUMMARY (3 ITEMS)
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: "Premium Persian Saffron",
                    qty: "Qty: 2 · 2g",
                    price: "$24.00",
                    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
                  },
                  {
                    name: "Organic Ceylon Cinnamon",
                    qty: "Qty: 2 · 100g",
                    price: "$18.50",
                    img: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
                  },
                  {
                    name: "Smoked Paprika",
                    qty: "Qty: 1 · 75g",
                    price: "$9.20",
                    img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.qty}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-3 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>$51.70</p>
                </div>
                <div className="flex justify-between text-green-600">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <p>Total Paid</p>
                  <p>$51.70</p>
                </div>
              </div>
            </div>

            {/* ✅ REFERRAL */}
            <div className="bg-yellow-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center border">
              <Gift className="mx-auto text-yellow-600" size={20} />
              <h4 className="font-semibold mt-2 text-sm">
                Share the Flavor
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Refer a friend and get 20% off your next order.
              </p>

              <button
                onClick={() => navigate("/referral")}
                className="mt-4 w-full border px-4 py-2 rounded-full text-xs sm:text-sm"
              >
                Get Referral Link
              </button>
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