import AdminLayout from "../layout/AdminLayout";
import ProductTable from "../components/ProductTable";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Product Inventory</h1>

          <p className="text-gray-500">
            Manage your premium spice catalog and monitor stock levels.
          </p>
        </div>

        <button
          className="hover:bg-[#e6c15a] bg-[#d4a62a] text-white px-5 py-2 rounded-xl font-medium"
          onClick={() => {
            navigate("/admin/products/add");
          }}
        >
          + Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-4">
        <input
          placeholder="Search products..."
          className="bg-gray-100 px-4 py-2 border rounded-lg w-64 outline-none"
        />

        <div className="bg-gray-100 px-4 py-2 border rounded-lg">
          <select>
            <option>All Categories</option>
            <option>Spices</option>
            <option>Powders</option>
            <option>Luxury</option>
          </select>
        </div>

        <div className="bg-gray-100 px-4 py-2 border rounded-lg">
          <select>
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <ProductTable />
    </AdminLayout>
  );
}

export default Products;
