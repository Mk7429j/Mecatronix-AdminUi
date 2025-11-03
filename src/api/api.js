// utils/api.js
import axios from "axios";

// ------------------------------
// 🌍 Environment Variables
// ------------------------------
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UPLOAD_BASE_URL = import.meta.env.VITE_API_UPLOAD_BASE_URL;
export const CLIENT_URL = import.meta.env.VITE_API_CUSTOMER_BASE_URL;

// ===================================================
// 🔹 Base Axios Configuration
// ===================================================
const axiosConfig = {
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ✅ sends and receives cookies automatically
};

// ===================================================
// 🔹 Public APIs (No Auth Required)
// ===================================================
export const loginUser = async (formData) => {
  try {
    // 🧠 Backend should set HttpOnly cookie here
    const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
      ...axiosConfig,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// ===================================================
// 🔹 Authenticated Axios Instance
// ===================================================
export const custom_request = axios.create(axiosConfig);

// 🧠 No manual Bearer token needed — cookies are auto-sent
custom_request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 🧩 Response Interceptor — Handle expired or unauthorized sessions
custom_request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      console.warn("⚠️ Session expired — logging out user...");
      window.location.href = "/"; // redirect to login
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

// ===================================================
// 🔹 Authenticated Endpoints (Protected)
// ===================================================

// ✅ Check if user still logged in (cookie-based)
export const checkLoginStatus = async () => {
  try {
    const { data } = await custom_request.get("/auth/check_login");
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Change Password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const { data } = await custom_request.post("/auth/change_password", {
      oldPassword,
      newPassword,
    });
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// forgotPasswordAPI
export const forgotPasswordAPI = async (email) => {
  try {
    const { data } = await custom_request.post("/auth/forgot_password", { email });
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

// resetPasswordAPI
export const resetPasswordAPI = async ({ token, newPassword }) => {
  try {
    const { data } = await custom_request.post("/auth/reset_password", { token, newPassword });
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

// verifyResetTokenAPI
export const verifyResetTokenAPI = async (token) => {
  try {
    const { data } = await custom_request.post("/auth/verifyresettoken", { token });
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

// ✅ Logout (clears HttpOnly cookie from server)
export const logout = async () => {
  try {
    const { data } = await custom_request.post("/auth/logout");
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// 🧩 src/api/api.js

// ✅ Upload Images
export const uploadImageAPI = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const { data } = await custom_request.post("/img/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data, "asdasd");
    return data;

  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Delete Images
export const deleteImageAPI = async (body) => {
  try {
    const { data } = await custom_request.delete("/img/delete", { data: body });
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// DashboardStats
export const DashboardStats = async () => {
  try {
    const { data } = await custom_request.get("/dash/all");
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};


// 🧠 BLOGS API

// ✅ Add Blog
export const addBlogAPI = async (formData) => {
  try {
    const { data } = await custom_request.post("/blogs/add", formData);
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Get All Blogs
export const getBlogsAPI = async () => {
  try {
    const { data } = await custom_request.get("/blogs/all");
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Edit Blog
export const editBlogAPI = async (id, formData) => {
  try {
    const { data } = await custom_request.put(`/blogs/edit/${id}`, formData);
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

// ✅ Delete Blog
export const deleteBlogAPI = async (id) => {
  try {
    const { data } = await custom_request.delete(`/blogs/delete/${id}`);
    return data;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};


// ===================================================
// 🔹 Utility
// ===================================================
export const searchData = (value) => (value ? value : null);

function handleApiError(error) {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "An unexpected error occurred";

  console.error("⚠️ API Error:", message);
}

export { BASE_URL, UPLOAD_BASE_URL };
