import AdminLayout from "../layout/AdminLayout";
import StatCard from "../components/StatCard";
import { AlertTriangle, ClipboardCheck, FileText, Users} from "lucide-react";

function Dashboard() {
  return (
    <AdminLayout>

      <h1 className="text-2xl font-semibold">
        Dashboard Overview
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome back, Elena. Your store is performing well today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Products"
          value="1,240"
          change="+2.4%"
          Icon={ClipboardCheck}
        />

        <StatCard
          title="Total Orders"
          value="856"
          change="+12.5%"
          Icon={FileText}
        />

        <StatCard
          title="Total Customers"
          value="3,120"
          change="+5.2%"
          Icon={Users}
        />

        <StatCard
          title="Low Stock Items"
          value="12"
          change="-2.1%"
          Icon={AlertTriangle}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Sales Analytics</h2>
            <button className="text-sm bg-gray-100 px-3 py-1 rounded-lg">
              Last 6 Months
            </button>
          </div>

          <div className="h-64 bg-gray-100 rounded-lg"></div>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Recent Orders</h2>
            <span className="text-sm text-yellow-600">View All</span>
          </div>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <p>James Wilson</p>
              <span>$42.00</span>
            </div>

            <div className="flex justify-between">
              <p>Sarah Chen</p>
              <span>$18.50</span>
            </div>

            <div className="flex justify-between">
              <p>Oliver Smith</p>
              <span>$64.20</span>
            </div>

            <div className="flex justify-between">
              <p>Maria Garcia</p>
              <span>$12.99</span>
            </div>

          </div>

          <button className="mt-6 w-full bg-[#e6c15a] text-white py-2 rounded-xl">
            Create New Order
          </button>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;