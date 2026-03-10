import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import AddProduct from "../admin/pages/AddProduct";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="products/add" element={<AddProduct/>}></Route>
    </Routes>
  );
}

export default AdminRoutes;