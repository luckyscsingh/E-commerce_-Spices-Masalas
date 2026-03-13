import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "Spices",
    description: "",
    basePrice: "",
    discountPrice: "",
    stock: "",
    lowStockAlert: "10",
    weight: "",
    shippingClass: "Standard Shipping",
    includeTax: false,
    trackInventory: false,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.basePrice) {
      setError("Product name and base price are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
      alert("Product created successfully! ✅");
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <AdminLayout>
      {/* TOPBAR */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold">Add New Product</h1>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            placeholder="Search product..."
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-56"
          />

          {/* Cancel */}
          <button
            onClick={() => navigate("/admin/products")}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-[#d4a62a] text-white font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>

          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Dashboard › Products › Add New
      </p>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-1">Basic Information</h2>

            <p className="text-sm text-gray-500 mb-6">
              Essential details about your spice product
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm">SKU</label>
                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="Spices">Spices</option>
                <option value="Powders">Powders</option>
                <option value="Luxury">Luxury</option>
                <option value="Seeds">Seeds</option>
                <option value="Herbs">Herbs</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm">Product Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                placeholder="Describe the aroma, origin, and culinary uses..."
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-1">Media</h2>

            <p className="text-sm text-gray-500 mb-4">
              Upload high-quality images of your spice
            </p>

            <label className="border-2 border-dashed border-yellow-300 rounded-xl p-10 text-center cursor-pointer block hover:border-yellow-500 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="font-medium">Click to upload or drag and drop</p>

              <p className="text-xs text-gray-500">
                PNG, JPG or WEBP (Max. 5MB)
              </p>
            </label>

            {/* thumbnails */}
            <div className="flex flex-wrap gap-3 mt-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4">Pricing</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm">Base Price ($)</label>
                <input
                  name="basePrice"
                  value={form.basePrice}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-sm">Discount Price ($)</label>
                <input
                  name="discountPrice"
                  value={form.discountPrice}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0.00"
                />
              </div>

              <label className="flex items-center gap-2 mt-2 text-sm">
                <input
                  type="checkbox"
                  name="includeTax"
                  checked={form.includeTax}
                  onChange={handleChange}
                />
                Include Tax
              </label>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4">Inventory</h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm">
                Track Inventory
                <input
                  type="checkbox"
                  name="trackInventory"
                  checked={form.trackInventory}
                  onChange={handleChange}
                />
              </label>

              <div>
                <label className="text-sm">Stock Quantity</label>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="text-sm">Low Stock Alert</label>
                <input
                  name="lowStockAlert"
                  value={form.lowStockAlert}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold mb-4">Shipping & Logistics</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm">Weight (kg)</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-sm">Shipping Class</label>
                <select
                  name="shippingClass"
                  value={form.shippingClass}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                >
                  <option>Standard Shipping</option>
                  <option>Express Shipping</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
