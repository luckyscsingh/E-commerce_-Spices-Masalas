import { useState } from "react";
import { Users, Zap, Star, User } from "lucide-react";
import AdminLayout from "../layout/AdminLayout";


const [page, setPage] = useState(1)
const rowsPerPage = 8


const allCustomers = [
  {
    id: "1",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    location: "Los Angeles, CA",
    status: "ACTIVE",
    orders: 18,
    spent: "$1,240.50",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    email: "m.thorne@domain.net",
    location: "Austin, TX",
    status: "VIP",
    orders: 42,
    spent: "$4,890.20",
    lastActive: "Yesterday",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    email: "sarah@spicehub.com",
    location: "Portland, OR",
    status: "ACTIVE",
    orders: 5,
    spent: "$342.15",
    lastActive: "5 days ago",
  },
  {
    id: "4",
    name: "David Chen",
    email: "chen.david@mail.com",
    location: "San Francisco, CA",
    status: "INACTIVE",
    orders: 0,
    spent: "$0.00",
    lastActive: "3 weeks ago",
  },
];

export default function Customers() {
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("recent");

  const filtered =
    tab === "all"
      ? allCustomers
      : tab === "vip"
        ? allCustomers.filter((c) => c.status === "VIP")
        : allCustomers.filter((c) => c.status === "INACTIVE");

const start = (page - 1) * rowsPerPage
const end = start + rowsPerPage

const visibleCustomers = customers.slice(start, end)

const totalPages = Math.ceil(customers.length / rowsPerPage)

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Customer Directory</h1>
            <p className="text-sm text-gray-500">
              Managing 12,540 registered spice enthusiasts
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="border px-4 py-2 rounded-lg text-sm">
              Export CSV
            </button>

            <button className="bg-[#d4a62a] text-white px-4 py-2 rounded-lg text-sm">
              + Add Customer
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total Customers"
            value="12,540"
            change="+12%"
            Icon={Users}
          />
          <StatCard
            title="Active This Month"
            value="842"
            change="+5%"
            Icon={Zap}
          />
          <StatCard title="New Signups" value="156" change="+8%" Icon={Star} />
        </div>

        {/* CUSTOMER TABLE */}
        <div className="bg-white rounded-xl border shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap justify-between items-center border-b px-6 pt-4">
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setTab("all")}
                className={`pb-3 ${
                  tab === "all"
                    ? "border-b-2 border-yellow-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                All Customers
              </button>

              <button
                onClick={() => setTab("vip")}
                className={`pb-3 ${
                  tab === "vip"
                    ? "border-b-2 border-yellow-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                VIP Members
              </button>

              <button
                onClick={() => setTab("inactive")}
                className={`pb-3 ${
                  tab === "inactive"
                    ? "border-b-2 border-yellow-500 font-medium"
                    : "text-gray-500"
                }`}
              >
                Inactive
              </button>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="recent">Recently Joined</option>
              <option value="orders">Most Orders</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Contact Info</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Orders</th>
                  <th className="px-6 py-3 text-left">Total Spent</th>
                  <th className="px-6 py-3 text-left">Last Active</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {visibleCustomers.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{c.name}</td>

                    <td className="px-6 py-4">
                      <p>{c.email}</p>
                      <p className="text-xs text-gray-400">{c.location}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs
                        ${
                          c.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : c.status === "VIP"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">{c.orders} Orders</td>

                    <td className="px-6 py-4 font-medium text-yellow-600">
                      {c.spent}
                    </td>

                    <td className="px-6 py-4 text-gray-500">{c.lastActive}</td>

                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-black">
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4 text-sm">
            <span className="text-gray-500">
              Showing 1-10 of 12,540 customers
            </span>

            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded">‹</button>
              <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <button className="px-3 py-1 border rounded">›</button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 border rounded-xl p-6">
            <h3 className="font-semibold mb-2">Top Customer of the Month</h3>
            <p className="text-sm text-gray-600 mb-4">
              Marcus Thorne reached "Grand Spice Master" status.
            </p>

            <button className="bg-[#d4a62a] text-white px-4 py-2 rounded-lg text-sm">
              Send Special Reward
            </button>
          </div>

          <div className="bg-white border rounded-xl p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>

            <p className="text-sm text-gray-500 mb-4">
              Access customer relationship tutorials.
            </p>

            <button className="text-yellow-600 font-medium">
              View CRM Guide
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, change, Icon }) {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className="flex flex-col items-end">
        <Icon className="text-yellow-500" size={22} />
        <span className="text-green-600 text-xs mt-2">{change}</span>
      </div>
    </div>
  );
}
