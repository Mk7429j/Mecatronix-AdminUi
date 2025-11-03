import React, { useState, useCallback, useEffect, useRef } from "react";
import { Menu, Bell, User, Search, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  successNotification,
  errorNotification,
} from "../../helpers/notifi_helper";
import { logout } from "../../api/api";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Topnav = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().format("hh:mm:ss A"));
  const [greeting, setGreeting] = useState("");
  const dropdownRef = useRef(null);

  // 🕒 Auto-update live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss A"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 🌅 Dynamic greeting message
  useEffect(() => {
    const hour = moment().hour();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning 🌅");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon ☀️");
    else if (hour >= 17 && hour < 20) setGreeting("Good Evening 🌇");
    else setGreeting("Good Night 🌙");
  }, []);

  // 🚪 Logout Handler
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      successNotification("You have logged out successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      errorNotification("Logout failed. Please try again.");
    }
  }, [navigate]);

  // 🧠 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 shadow-lg backdrop-blur-md">
      {/* 🔻 Animated Accent Line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-red-500 via-orange-400 to-red-600"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* 🔹 Main Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* 🔸 Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">

          <h1 className="text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent select-none">
            Mecatrone Admin
          </h1>
        </div>

        {/* 🔸 Center: Greeting + Clock */}
        <div className="hidden md:flex flex-row items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={greeting}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-gray-400 font-medium"
            >
              {greeting}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-2 text-sm font-mono text-gray-300 bg-zinc-900/60 px-2 py-1 rounded-lg border border-zinc-800 shadow-inner">
            🕒 {currentTime}
          </div>
        </div>

        {/* 🔸 Right: Actions */}
        <div className="flex items-center gap-5 relative">
          {/* 🔍 Mobile Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden text-gray-400 hover:text-red-500 transition"
          >
            <Search size={18} />
          </button>

          {/* 🔔 Notifications */}
          <button
            className="relative text-gray-400 hover:text-red-500 transition transform hover:scale-110"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-400 text-[10px] px-1 rounded-full shadow-md">
              3
            </span>
          </button>

          {/* 👤 Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-zinc-900/70 border border-zinc-800 px-3 py-1 rounded-full hover:border-red-500 hover:bg-zinc-800/70 transition"
              aria-label="User menu"
            >
              <User className="w-4 h-4 text-gray-400" />
              <span className="hidden sm:inline text-sm font-medium">
                Admin
              </span>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:text-white transition-all"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 🔍 Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 bg-zinc-950/95 flex items-center justify-center p-4 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 w-full max-w-sm shadow-md">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent text-sm w-full outline-none placeholder-gray-500 text-gray-300"
              />
              <X
                onClick={() => setIsSearchOpen(false)}
                className="w-5 h-5 text-gray-400 ml-2 hover:text-red-500 cursor-pointer"
                aria-label="Close search"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Topnav;
