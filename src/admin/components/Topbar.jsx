import { Menu, Bell } from "lucide-react";

function Topbar({ setSidebarOpen }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">

      <div className="flex items-center gap-3">

        {/* Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <input
          placeholder="Search orders, spices, or customers..."
          className="bg-gray-100 px-4 py-2 rounded-full w-full sm:w-105 outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell size={18} />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-9 h-9 rounded-full"
          />
        </div>

      </div>

    </header>
  );
}

export default Topbar;