import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg">
          Create Account
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}