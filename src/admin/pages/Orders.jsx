import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatCard";
import { Package, Truck, CheckCircle } from "lucide-react";
import { useState } from "react";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const itemsPerPage = 3;

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-gray-500 text-sm">
              Review and manage customer orders
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg text-sm">
              Export
            </button>

            <button className="px-4 py-2 hover:bg-[#e6c15a] bg-[#d4a62a] text-white rounded-lg text-sm">
              + Create Order
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Pending Orders"
            value="24"
            change="Today"
            Icon={Package}
          />

          <StatCard title="In Transit" value="58" change="+12%" Icon={Truck} />

          <StatCard
            title="Delivered (MTD)"
            value="412"
            change="86% Goal"
            Icon={CheckCircle}
          />
        </div>

        {/* ORDERS TABLE */}
        <div className="bg-white rounded-xl border shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-6 border-b px-6 pt-4 text-sm">
            <button
              onClick={() => setStatusFilter("all")}
              className={
                statusFilter === "all"
                  ? "text-black border-b-2 border-yellow-500 pb-3"
                  : ""
              }
            >
              All Orders
            </button>
            <button
              onClick={() => setStatusFilter("unfulfilled")}
              className={
                statusFilter === "unfulfilled"
                  ? "text-black border-b-2 border-yellow-500 pb-3"
                  : ""
              }
            >
              Unfulfilled
            </button>
            <button
              onClick={() => setStatusFilter("shipped")}
              className={
                statusFilter === "shipped"
                  ? "text-black border-b-2 border-yellow-500 pb-3"
                  : ""
              }
            >
              Shipped
            </button>
            <button
              onClick={() => setStatusFilter("delivered")}
              className={
                statusFilter === "delivered"
                  ? "text-black border-b-2 border-yellow-500 pb-3"
                  : ""
              }
            >
              Delivered
            </button>
            <button
              onClick={() => setStatusFilter("cancelled")}
              className={
                statusFilter === "cancelled"
                  ? "text-black border-b-2 border-yellow-500 pb-3"
                  : ""
              }
            >
              Cancelled
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
            <input
              placeholder="Filter by customer or ID..."
              className="border rounded-lg px-4 py-2 text-sm w-full md:w-72"
            />

            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full text-sm min-w-175">
              <thead className="text-gray-500 border-t border-b bg-gray-50">
                <tr>
                  <th className="text-left px-3 md:px-6 py-3">Order ID</th>
                  <th className="text-left px-3 md:px-6 py-3">Customer</th>
                  <th className="text-left px-3 md:px-6 py-3">Date</th>
                  <th className="text-left px-3 md:px-6 py-3">Amount</th>
                  <th className="text-left px-3 md:px-6 py-3">Status</th>
                  <th className="text-left px-3 md:px-6 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-4 font-medium">
                      {order.id}
                    </td>

                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                        {order.initial}
                      </div>

                      <div>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-gray-400 text-xs">{order.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">{order.date}</td>

                    <td className="px-6 py-4 font-medium">{order.amount}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          order.status === "Pending"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Shipped"
                              ? "bg-orange-100 text-orange-600"
                              : order.status === "Delivered"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-yellow-600 cursor-pointer">
                      View Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-4 p-6 text-sm">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="text-gray-500 px-3 py-1 border rounded"
            >
              ‹
            </button>

            {/* Current Page */}
            <button className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">
              {currentPage}
            </button>

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="text-gray-500 px-3 py-1 border rounded"
            >
              ›
            </button>
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, orders.length)} of{" "}
              {orders.length} orders
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;

const orders = [
  {
    id: "#SH-1024",
    name: "John Doe",
    email: "john@example.com",
    date: "Oct 24, 2023",
    amount: "$45.00",
    status: "Pending",
    initial: "JD",
  },
  {
    id: "#SH-1023",
    name: "Jane Smith",
    email: "jane@example.com",
    date: "Oct 23, 2023",
    amount: "$120.50",
    status: "Shipped",
    initial: "JS",
  },
  {
    id: "#SH-1022",
    name: "Robert Brown",
    email: "robert@example.com",
    date: "Oct 23, 2023",
    amount: "$32.20",
    status: "Delivered",
    initial: "RB",
  },
  {
    id: "#SH-1021",
    name: "Emily Davis",
    email: "emily@example.com",
    date: "Oct 22, 2023",
    amount: "$88.00",
    status: "Cancelled",
    initial: "ED",
  },
];
