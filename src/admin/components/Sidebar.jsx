import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const link =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100";

  const active = "bg-[#f4e8c9] text-[#c8a542]";

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:static z-50
        bg-white w-64 
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 border-r
        `}
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="font-semibold text-lg">SpiceHaven</h2>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          >
            Orders
          </NavLink>

          <NavLink
            to="/admin/customers"
            className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          >
            Customers
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
