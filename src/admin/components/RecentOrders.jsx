function RecentOrders() {
  const orders = [
    { name: "James Wilson", product: "Saffron Grade A x2", price: "$42.00" },
    { name: "Sarah Chen", product: "Cinnamon Sticks x10", price: "$18.50" },
    { name: "Oliver Smith", product: "Star Anise Bulk x1", price: "$64.20" },
    { name: "Maria Garcia", product: "Mixed Peppercorns x3", price: "$12.99" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-4">Recent Orders</h2>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <p className="font-medium">{order.name}</p>
              <p className="text-xs text-gray-500">{order.product}</p>
            </div>

            <span>{order.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;