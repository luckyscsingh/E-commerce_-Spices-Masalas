import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import AddProduct from "../admin/pages/AddProduct";
import Orders from "../admin/pages/Orders";
import Customers from "../admin/pages/Customers";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="products/add" element={<AddProduct />}></Route>
      <Route path="orders" element={<Orders />} />
      <Route path="customers" element={<Customers />} />
    </Routes>
  );
}

export default AdminRoutes;
