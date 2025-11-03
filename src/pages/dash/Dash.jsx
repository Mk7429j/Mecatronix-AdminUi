import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Users,
  Star,
  Bell,
  Mail,
  Package,
} from "lucide-react";

const Dash = () => {
  const stats = [
    { icon: FileText, label: "Blogs", value: "32", color: "from-blue-500 to-cyan-400" },
    { icon: Package, label: "Banners", value: "8", color: "from-violet-500 to-purple-400" },
    { icon: Bell, label: "New Offers", value: "5", color: "from-rose-500 to-orange-400" },
    { icon: Users, label: "Enquiries", value: "27", color: "from-emerald-500 to-green-400" },
    { icon: Star, label: "Reviews", value: "114", color: "from-yellow-400 to-orange-300" },
    { icon: Mail, label: "Subscribers", value: "341", color: "from-red-500 to-pink-400" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-400">
          Welcome back, <span className="text-red-500 font-semibold">Admin</span> 👋
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl p-5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${stat.color} flex items-center justify-center mb-3`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-400 text-sm">{stat.label}</h3>
            <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Traffic Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Traffic Overview</h2>
            <BarChart3 className="text-red-400 w-5 h-5" />
          </div>
          <div className="h-52 flex items-center justify-center text-gray-500 text-sm border border-zinc-800 rounded-lg">
            📊 Chart placeholder (add Recharts here)
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <Bell className="text-orange-400 w-5 h-5" />
          </div>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>📝 New blog post published — <span className="text-gray-200">AI & Drones</span></li>
            <li>🎯 New offer launched — <span className="text-gray-200">Festive Combo</span></li>
            <li>📬 5 new subscribers joined today</li>
            <li>⭐ 3 new reviews received</li>
            <li>💬 2 new enquiries pending</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Text */}
      <div className="text-center text-gray-500 text-sm pt-6 border-t border-zinc-800">
        © {new Date().getFullYear()} Mecatrone Admin Dashboard • Powered by{" "}
        <span className="text-red-500 font-semibold">Mecatrone</span>
      </div>
    </div>
  );
};

export default Dash;
