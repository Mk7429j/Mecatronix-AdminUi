import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Users,
  Star,
  Bell,
  Mail,
  Package,
  UserCog,
} from "lucide-react";
import { DashboardStats } from "../../api/api"; // ✅ your API function

const Dash = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const HandleFetch = async () => {
    try {
      const result = await DashboardStats();
      if (result?.success) setStats(result.data);
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    HandleFetch();
  }, []);

  const cards = stats
    ? [
        {
          icon: FileText,
          label: "Blogs",
          value: stats.blogs,
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: Package,
          label: "Banners",
          value: stats.banners,
          color: "from-violet-500 to-purple-400",
        },
        {
          icon: Users,
          label: "Clients",
          value: stats.clients,
          color: "from-green-500 to-emerald-400",
        },
        {
          icon: Bell,
          label: "Enquiries",
          value: stats.enquiries.total,
          color: "from-rose-500 to-orange-400",
        },
        {
          icon: Star,
          label: "Reviews",
          value: stats.reviews.total,
          color: "from-yellow-400 to-orange-300",
        },
        {
          icon: Mail,
          label: "Subscribers",
          value: stats.subscribers,
          color: "from-red-500 to-pink-400",
        },
        {
          icon: UserCog,
          label: "Admins",
          value: stats.admins.total,
          color: "from-indigo-500 to-sky-400",
        },
        {
          icon: BarChart3,
          label: "Projects",
          value: stats.projects,
          color: "from-fuchsia-500 to-pink-400",
        },
      ]
    : [];

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
      {loading ? (
        <p className="text-gray-400 text-center mt-10">Loading dashboard...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl p-5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${card.color} flex items-center justify-center mb-3`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-400 text-sm">{card.label}</h3>
              <p className="text-2xl font-semibold text-white mt-1">{card.value}</p>
            </motion.div>
          ))}
        </div>
      )}

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
            <li>📝 {stats?.blogs || 0} total blogs posted</li>
            <li>📬 {stats?.subscribers || 0} active subscribers</li>
            <li>⭐ {stats?.reviews.total || 0} total reviews</li>
            <li>💬 {stats?.enquiries.unopened || 0} new enquiries pending</li>
            <li>👑 {stats?.admins.superadmin || 0} superadmins registered</li>
          </ul>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm pt-6 border-t border-zinc-800">
        © {new Date().getFullYear()} Mecatrone Admin Dashboard • Powered by{" "}
        <span className="text-red-500 font-semibold">Mecatrone</span>
      </div>
    </div>
  );
};

export default Dash;
