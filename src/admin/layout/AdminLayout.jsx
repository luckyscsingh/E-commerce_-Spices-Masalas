import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#f6f7fb] min-h-screen overflow-x-hidden">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">

        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="p-3 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;