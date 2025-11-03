import React from "react";
import { Server, Database, ShieldCheck } from "lucide-react";

const Foot = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-zinc-950/90 border-t border-zinc-800 text-gray-400 py-4 px-6 flex flex-col md:flex-row items-center justify-between gap-3 backdrop-blur-md shadow-[0_-4px_15px_rgba(0,0,0,0.4)]"
      role="contentinfo"
    >
      {/* 🔰 Branding */}
      <div className="flex items-center gap-2 text-sm md:text-base">
        <ShieldCheck className="w-5 h-5 text-red-500" aria-hidden="true" />
        <span className="font-semibold text-gray-200">
          Mecatrone Admin Panel
        </span>
      </div>

      {/* 🧠 System Status */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Server className="w-4 h-4 text-green-500" aria-hidden="true" />
          <span className="text-gray-400">Server:</span>
          <span className="text-green-400 font-medium">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Database className="w-4 h-4 text-blue-500" aria-hidden="true" />
          <span className="text-gray-400">Database:</span>
          <span className="text-blue-400 font-medium">Connected</span>
        </div>
      </div>

      {/* 🕓 Copyright */}
      <p className="text-[11px] sm:text-xs text-gray-500 text-center">
        © {currentYear}{" "}
        <span className="text-red-500 font-medium">Mecatrone</span> — Admin
        System. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Foot;
