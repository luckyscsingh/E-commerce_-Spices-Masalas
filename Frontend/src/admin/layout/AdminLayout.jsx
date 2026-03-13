import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#f6f7fb] min-h-screen">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">

        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;