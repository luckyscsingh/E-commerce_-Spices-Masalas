const products = [
  {
    name: "Premium Ceylon Cinnamon",
    category: "Spices",
    price: "$18.99",
    stock: "In Stock",
    qty: 240,
  },
  {
    name: "Organic Ground Turmeric",
    category: "Powders",
    price: "$12.50",
    stock: "Low Stock",
    qty: 12,
  },
  {
    name: "Whole Star Anise",
    category: "Spices",
    price: "$15.00",
    stock: "In Stock",
    qty: 86,
  },
  {
    name: "Pure Persian Saffron",
    category: "Luxury",
    price: "$55.00",
    stock: "Out of Stock",
    qty: 0,
  },
];

function statusBadge(status) {
  if (status === "In Stock")
    return "bg-green-100 text-green-600";

  if (status === "Low Stock")
    return "bg-yellow-100 text-yellow-600";

  return "bg-red-100 text-red-600";
}

function ProductTable() {
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
          </tr>
        </thead>

        <tbody>

          {products.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">

              <td className="py-4 px-6 font-medium">
                {p.name}
              </td>

              <td>{p.category}</td>

              <td>{p.price}</td>

              <td>{p.qty}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                    p.stock
                  )}`}
                >
                  {p.stock}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;