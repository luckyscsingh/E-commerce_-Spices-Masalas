import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import groundMasala from "../assets/groundmasala.jpeg";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (!form.agree) {
      alert("You must agree to Terms & Conditions");
      return;
    }

    alert("Account Created Successfully ✅");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-yellow-100/20 flex relative">
      {/* ✅ Company Name - Top Right */}
      <div className="absolute top-6 left-6 z-50">
        <h1 className="text-lg md:text-xl font-bold tracking-wide text-white">
          <span className="text-white">Spice</span>Masala
        </h1>
      </div>

      {/* ✅ LEFT IMAGE (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src={groundMasala}
          alt="Spices"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            Elevate Your Kitchen Story
          </h1>
          <p className="text-lg text-gray-200">
            Join a community of culinary enthusiasts and get access to the world's most aromatic spices.
          </p>

          <div className="flex gap-4 mt-8">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              ⭐ Top Rated Spices
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
              🚚 Global Shipping
            </span>
          </div>
        </div>
      </div>

      {/* ✅ RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* ✅ Mobile Image (Blurred) */}
          <div className="md:hidden relative mb-8 h-52 rounded-3xl overflow-hidden">
            <img
              src={groundMasala}
              alt="Spices"
              className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
              <h1 className="text-2xl font-bold">
                <span className="text-yellow-400">Spice</span>Heaven
              </h1>
              <p className="text-sm text-gray-200">
                Premium Indian Spices
              </p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 mb-8">
            Start your flavor-filled journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ✅ Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>

            {/* ✅ Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>

            {/* ✅ Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ✅ Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 accent-yellow-600"
              />
              <span>
                I agree to the{" "}
                <span className="text-yellow-600">Terms & Conditions</span> and{" "}
                <span className="text-yellow-600">Privacy Policy</span>.
              </span>
            </div>

            {/* ✅ Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold shadow-md transition"
            >
              Create Account →
            </button>
          </form>

          {/* ✅ Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* ✅ Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Google Signup")}
              className="border border-gray-300 py-3 rounded-full hover:bg-gray-50"
            >
              Google
            </button>
            <button
              onClick={() => alert("Facebook Signup")}
              className="border border-gray-300 py-3 rounded-full hover:bg-gray-50"
            >
              Facebook
            </button>
          </div>

          {/* ✅ Login Link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}