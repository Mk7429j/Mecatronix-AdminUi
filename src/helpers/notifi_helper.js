/* eslint-disable no-empty */
import { toast } from "react-toastify";
import _ from "lodash";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

// ===================================================
// 🔹 Toastify Notification Helpers
// ===================================================

/**
 * 🧨 Display an error or warning notification
 * @param {object|string|Error} err - Axios error object or custom message
 */
export const errorNotification = (err) => {
  const message =
    _.get(err, "response.data.message") ||
    _.get(err, "message") ||
    (_.isString(err) ? err : "Something went wrong. Please try again.");

  toast.error(message, {
    position: "top-right",
    autoClose: 3500,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

/**
 * ✅ Display a success notification
 * @param {object|string} res - Axios response object or custom string
 */
export const successNotification = (res) => {
  const message =
    _.get(res, "data.message") || (_.isString(res) ? res : "Success");

  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

/**
 * ⚠️ Show upload error notification
 * @param {string} fileType - e.g., "profile", "banner"
 */
export const customUploadError = (fileType = "file") => {
  toast.warning(`Please upload a valid ${fileType} image.`, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

/**
 * ⚠️ Generic warning notification
 * @param {string} message
 */
export const customWarning = (message = "Please check your input.") => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

