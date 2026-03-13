import { useEffect, useState } from "react";
import api from "../../services/api";

function statusBadge(stock) {
  if (stock > 10) return "bg-green-100 text-green-600";
  if (stock > 0) return "bg-yellow-100 text-yellow-600";
  return "bg-red-100 text-red-600";
}

function statusText(stock) {
  if (stock > 10) return "In Stock";
  if (stock > 0) return "Low Stock";
  return "Out of Stock";
}

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      // Handle both paginated object and simple array
      const productsData = Array.isArray(res.data) ? res.data : (res.data.products || []);
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
        No products found. Add your first product!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">

      <table className="w-full text-left">

        <thead className="border-b text-gray-500 text-sm">
          <tr>
            <th className="py-4 px-6">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((p) => (
            <tr key={p._id} className="border-b hover:bg-gray-50">

              <td className="py-4 px-6 font-medium flex items-center gap-3">
                {p.image && (
                  <img
                    src={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                {p.name}
              </td>

              <td>{p.category}</td>

              <td>${p.basePrice}</td>

              <td>{p.stock}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                    p.stock
                  )}`}
                >
                  {statusText(p.stock)}
                </span>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;