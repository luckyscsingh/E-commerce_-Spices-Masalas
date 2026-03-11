import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import ProductDetails from "./pages/ProductDetails";
import RecipesPage from "./pages/RecipesPage";
import KashmiriSaffronDetails from "./pages/KashmiriSaffronDetails.jsx";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminRoutes from "./routes/AdminRoutes.jsx";

function App() {
  return (
    <Router>

      <Routes>
        <Route element={<Layout />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/spices" element={<ProductDetails />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/product/6" element={<KashmiriSaffronDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ROUTES */}

        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>

    </Router>
  );
}

export default App;