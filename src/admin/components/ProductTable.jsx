import { useState, useEffect } from "react";

function statusBadge(status) {
  if (status === "In Stock") return "bg-green-100 text-green-600";

  if (status === "Low Stock") return "bg-yellow-100 text-yellow-600";

  return "bg-red-100 text-red-600";
}

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setProducts(savedProducts);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;
    const updatedProducts = products.filter((p) => p.id !== id);

    setProducts(updatedProducts);

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b text-gray-500 text-sm">
          <tr>
            <th className="py-4 px-6">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6 font-medium">{p.name}</td>

              <td>{p.category}</td>

              <td>{p.price}</td>

              <td>{p.qty}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                    p.stock,
                  )}`}
                >
                  {p.stock}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
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
