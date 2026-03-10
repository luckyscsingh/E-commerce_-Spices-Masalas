import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import groundMasala from "../assets/groundmasala.jpeg";
import { Eye, EyeOff, ChefHat } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Fake login logic (replace with real auth later)
    alert("Login Successful ✅");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-yellow-100/20 flex flex-col md:flex-row">
      {/* ✅ Company Branding */}
      <div className="w-full flex justify-center md:justify-end md:absolute md:top-6 md:left-6 md:w-auto py-6 md:py-0">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="text-yellow-600" size={24} />
          <h1 className="text-xl font-semibold text-gray-900">
            <span className="text-yellow-600">Spice</span>Masala
          </h1>
        </Link>
      </div>

      {/* ✅ LEFT IMAGE SECTION (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src={groundMasala}
          alt="Spices"
          className="absolute inset-0 w-full h-full blur-sm object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Experience the essence of premium Indian spices.
          </h1>
          <p className="text-lg text-gray-200">
            Hand-picked, sun-dried, and delivered from the heart of India to your kitchen.
          </p>
        </div>
      </div>

      {/* ✅ RIGHT FORM SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* ✅ Mobile Image */}
          <div className="md:hidden relative mb-6 h-52 rounded-3xl overflow-hidden">

            <img
              src={groundMasala}
              alt="Spices"
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-70"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your details to sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ✅ Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone Number
              </label>
              <input
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
              />
            </div>

            {/* ✅ Password */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <label className="font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-yellow-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ✅ Remember */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-yellow-600" />
              <span>Remember me for 30 days</span>
            </div>

            {/* ✅ Sign In Button */}
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold shadow-md transition"
            >
              Sign In
            </button>
          </form>

          {/* ✅ Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-400 text-sm">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* ✅ Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Google Login")}
              className="border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
            >
              Google
            </button>

            <button
              onClick={() => alert("Facebook Login")}
              className="border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
            >
              Facebook
            </button>
          </div>

          {/* ✅ Signup */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-600 font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}