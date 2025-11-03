import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Topnav from "../nav/Topnav";
import Sidenav from "../nav/Sidenav";
import Foot from "../foot/Foot";

const Adminlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔁 Toggle Sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-gray-100 overflow-hidden">
      {/* ✅ Sidebar (Desktop + Mobile) */}
      <aside
        className={`fixed top-0 left-0 h-full border-r border-zinc-800 bg-zinc-900/70 backdrop-blur-md z-40 transition-all duration-300 no-scrollbar
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-64"}
        `}
      >
        <Sidenav />
      </aside>

      {/* ✅ Right Section */}
      <div
        className={`flex flex-col min-h-screen w-full transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-64"
        }`}
      >
        {/* 🔝 Top Navbar */}
        <header className="sticky top-0 z-30 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 shadow-lg shadow-black/20">
          <Topnav onToggleSidebar={toggleSidebar} />
        </header>

        {/* 🧩 Main Content */}
        <main className="flex-1 pt-6 overflow-y-auto no-scrollbar scroll-smooth p-5 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>

        {/* 🦶 Footer */}
        <footer className="bg-zinc-900/80 border-t border-zinc-800 py-4 text-center text-sm text-gray-500 tracking-wide">
          <Foot />
        </footer>
      </div>

      {/* 📱 Mobile Overlay (when sidebar open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Adminlayout;
