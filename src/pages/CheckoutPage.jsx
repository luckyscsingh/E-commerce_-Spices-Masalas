import { Truck, Package, Wallet, Smartphone } from "lucide-react";
import cardamom from "../assets/greencardamom.jpg";
import redchilli from "../assets/redchillipowder.jpg.webp";

export default function CheckoutPage() {
  return (
    <div className="bg-yellow-100/20 min-h-screen text-gray-900 flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="border-b border-yellow-400/40 bg-yellow-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-yellow-600">
            SpiceHaven
          </h1>

          <nav className="hidden md:flex gap-8 text-gray-600">
            <a href="/spices">Shop</a>
            <a href="/recipes">Recipes</a>
            <a href="/our-story">About</a>
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-3 gap-12 flex-grow">

        {/* ================= LEFT SECTION ================= */}
        <div className="lg:col-span-2 space-y-12">

          <h2 className="text-3xl sm:text-4xl font-bold">Checkout</h2>

          {/* ================= DELIVERY ADDRESS (Transparent) ================= */}
          <div>
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-6">
              <Truck size={18} /> Delivery Address
            </h3>

            <div className="space-y-4">

              <div>
                <label className="label">Full Name</label>
                <input className="input-style" placeholder="Johnathan Doe" />
              </div>

              <div>
                <label className="label">Street Address</label>
                <input className="input-style" placeholder="123 Saffron Boulevard" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Apartment / Suite</label>
                  <input className="input-style" placeholder="Apt 4B" />
                </div>

                <div>
                  <label className="label">City</label>
                  <input className="input-style" placeholder="Mumbai" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">State / Province</label>
                  <input className="input-style" placeholder="Maharashtra" />
                </div>

                <div>
                  <label className="label">ZIP / Postcode</label>
                  <input className="input-style" placeholder="400001" />
                </div>
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input className="input-style" placeholder="+91 98765 43210" />
              </div>

            </div>
          </div>

          {/* ================= SHIPPING METHOD ================= */}
          <div className="border-t border-yellow-400/30 pt-10">
            <h3 className="flex items-center gap-2 text-yellow-600 font-semibold mb-6">
              <Package size={18} /> Shipping Method
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">

              <div className="shipping-active">
                <div>
                  <p className="font-semibold">Standard Shipping</p>
                  <p className="text-sm opacity-80">4‑7 Business Days</p>
                </div>
                <span className="font-semibold">Free</span>
              </div>

              <div className="shipping-normal">
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
              <button className="payment-active">
                <Wallet size={18} />
                Cash on Delivery
              </button>

              {/* UPI */}
              <button className="payment-normal">
                <Smartphone size={18} />
                UPI
              </button>

            </div>

          </div>

        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg h-fit">

          <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

          <div className="flex justify-between items-center mb-5">
            <div className="flex gap-4 items-center">
              <img src={cardamom} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-sm">Kashmiri Saffron (2g)</p>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
            </div>
            <p className="text-yellow-600 font-semibold">$45.00</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <img src={redchilli} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-sm">Tellicherry Peppercorns</p>
                <p className="text-xs text-gray-500">Qty: 2</p>
              </div>
            </div>
            <p className="text-yellow-600 font-semibold">$24.00</p>
          </div>

          <div className="border-t pt-5 space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$69.00</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (Estimated)</span>
              <span>$5.52</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span className="text-yellow-600">$74.52</span>
            </div>

          </div>

          <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-full transition text-sm sm:text-base">
            Complete Purchase
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            Secure checkout powered by SSL encryption
          </p>

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-yellow-400/30 py-6 text-center text-gray-500 text-sm">
        © 2024 SpiceHaven Artisanal Spices. All Rights Reserved.
      </footer>
    </div>
  );
}