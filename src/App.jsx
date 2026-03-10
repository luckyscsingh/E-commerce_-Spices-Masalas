import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AddProduct from "./admin/pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;