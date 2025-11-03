// ============================================
// 🌐 Mecatrone Admin Authentication (Frontend)
// ============================================

import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { loginUser } from "../../api/api";
import {
  errorNotification,
  successNotification,
} from "../../helpers/notifi_helper";

const Auth = () => {
  // --------------------------------------------
  // 🔹 State Management
  // --------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // --------------------------------------------
  // 🔐 Handle Login (Cookie-based Auth)
  // --------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.email.trim() || !formData.password.trim()) {
      return errorNotification("Email and password are required");
    }

    try {
      setLoading(true);

      // ✅ API call — axios handles cookies via withCredentials: true
      const res = await loginUser(formData);

      if (res?.success) {
        successNotification(res?.message || "Login successful!");

        // Clear form
        setFormData({ email: "", password: "" });

        // Redirect after short delay
        setTimeout(() => navigate("/mec-admin", { replace: true }), 800);
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      errorNotification(
        _.get(err, "response.data.message") ||
          _.get(err, "message") ||
          "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------
  // 🎨 UI Layout
  // --------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-gray-100 relative overflow-hidden">
      {/* 🔴 Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl animate-ping" />
      </div>

      {/* 🧱 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="relative w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.15)] p-8 transition-transform"
      >
        {/* 🧠 Branding */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-400 rounded-full shadow-[0_0_40px_rgba(239,68,68,0.5)] flex items-center justify-center text-2xl font-extrabold text-white"
          >
            M
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold text-red-500 tracking-wide">
            Mecatrone Admin
          </h1>
          <p className="text-sm text-gray-400">
            Secure login to your control panel
          </p>
        </div>

        {/* 🧾 Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="flex items-center bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2.5 focus-within:border-red-500 transition-all">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="admin@mecatrone.in"
                required
                autoComplete="off"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>
            <div className="flex items-center bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2.5 focus-within:border-red-500 transition-all">
              <Lock className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                required
                autoComplete="off"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-500"
              />
              {showPassword ? (
                <EyeOff
                  onClick={() => setShowPassword(false)}
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-400 transition"
                />
              ) : (
                <Eye
                  onClick={() => setShowPassword(true)}
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-400 transition"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            disabled={loading}
            className={`w-full mt-6 py-2.5 rounded-lg font-semibold tracking-wide text-white transition-all ${
              loading
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
            }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </motion.button>
        </form>

        {/* 🔻 Footer */}
        <div className="text-center text-xs text-gray-500 mt-6 border-t border-zinc-800 pt-4">
          © {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-medium">Mecatrone</span> Admin
          Panel
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
