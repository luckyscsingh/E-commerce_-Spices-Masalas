import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import ProductDetails from "./pages/ProductDetails";
import KashmiriSaffronDetails from "./pages/KashmiriSaffronDetails.jsx";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/spices" element={<ProductDetails />} />
        <Route path="/product/6" element={<KashmiriSaffronDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;