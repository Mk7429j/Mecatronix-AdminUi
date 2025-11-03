// ============================================
// 🔐 Mecatrone Forgot Password Page
// ============================================

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { forgotPasswordAPI } from "../../api/api";
import {
  errorNotification,
  successNotification,
} from "../../helpers/notifi_helper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) return errorNotification("Please enter your email");

    try {
      setLoading(true);
      const res = await forgotPasswordAPI(email);
      if (res?.success) {
        successNotification(res?.message || "Password reset link sent!");
        setEmail("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        throw new Error(res?.message || "Failed to send reset link");
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      errorNotification(
        _.get(err, "response.data.message") ||
          _.get(err, "message") ||
          "Error sending password reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl animate-ping" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.15)] p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-400 rounded-full flex items-center justify-center text-2xl font-extrabold text-white">
            M
          </div>
          <h1 className="mt-4 text-3xl font-bold text-red-500 tracking-wide">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-400">
            We’ll send a reset link to your registered email.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="flex items-center bg-zinc-800/60 border border-zinc-700 rounded-lg px-3 py-2.5 focus-within:border-red-500 transition-all">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mecatrone.in"
                required
                autoComplete="off"
                className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-500"
              />
            </div>
          </div>

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
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
