import React, { useEffect, useState } from "react";
import { createBrowserRouter, Navigate, Outlet, useNavigate } from "react-router-dom";

// 🔹 Layout
import Adminlayout from "../components/layout/Adminlayout";

// 🔹 Pages
import Auth from "../components/auth/Auth";
import Dash from "../pages/dash/Dash";
import Blogs from "../pages/blogs/Blogs";
import Banners from "../pages/banners/Banners";
import Offers from "../pages/offers/Offers";
import Enquiries from "../pages/enquiries/Enquiries";
import Reviews from "../pages/reviews/Reviews";
import Subscribers from "../pages/subscribers/Subscribers";

// 🔹 API
import { checkLoginStatus } from "../api/api";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";

// ===================================================
// 🔸 Private Route Wrapper (For Protected Admin Pages)
// ===================================================
// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await checkLoginStatus();
        if (res?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/", { replace: true });
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-500"></div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

// ===================================================
// 🔸 Router Configuration
// ===================================================
const router = createBrowserRouter([
  // 🔹 Public Route — Login Page
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  // 🔹 Protected Admin Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/mec-admin",
        element: <Adminlayout />,
        children: [
          { index: true, element: <Dash /> },
          { path: "blogs", element: <Blogs /> },
          { path: "banners", element: <Banners /> },
          { path: "offers", element: <Offers /> },
          { path: "enquiries", element: <Enquiries /> },
          { path: "reviews", element: <Reviews /> },
          { path: "subscribers", element: <Subscribers /> },
        ],
      },
    ],
  },

  // 🔹 Fallback — Unknown Paths
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
