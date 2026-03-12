import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleSaveProduct = () => {
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.stock
    ) {
      alert("Please fill all product fields");
      return;
    }
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: product.price,
      qty: product.stock,
      stock: product.stock > 0 ? "In Stock" : "Out of Stock",
    };

    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    navigate("/admin/products");
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
            onClick={handleSaveProduct}
            className="px-5 py-2 rounded-lg bg-[#d4a62a] text-white font-medium"
          >
            Save Product
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

      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

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
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="text-sm">SKU</label>
                <input
                  value={product.sku}
                  onChange={(e) =>
                    setProduct({ ...product, sku: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm">Category</label>
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <option value="">Select Category</option>
                <option value="Spices">Spices</option>
                <option value="Powders">Powders</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm">Product Description</label>

              <textarea
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

            <div className="border-2 border-dashed border-yellow-300 rounded-xl p-10 text-center">
              <p className="font-medium">Click to upload or drag and drop</p>

              <p className="text-xs text-gray-500">
                PNG, JPG or WEBP (Max. 5MB)
              </p>
            </div>

            {/* thumbnails */}

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="w-16 h-16 border rounded-lg flex items-center justify-center">
                +
              </div>
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
                  className="border rounded-lg px-3 py-2 text-sm w-full sm:w-56"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-sm">Discount Price ($)</label>
                <input
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="border rounded-lg px-3 py-2 text-sm w-full sm:w-56"
                  placeholder="0.00"
                />
              </div>

              <label className="flex items-center gap-2 mt-2 text-sm">
                <input type="checkbox" />
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
                <input type="checkbox" />
              </label>

              <div>
                <label className="text-sm">Stock Quantity</label>
                <input
                  value={product.stock}
                  onChange={(e) =>
                    setProduct({ ...product, stock: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="text-sm">Low Stock Alert</label>
                <input
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="L"
                />
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="W"
                />
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  placeholder="H"
                />
              </div>

              <div>
                <label className="text-sm">Shipping Class</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500">
                  <option>Standard Shipping</option>
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
