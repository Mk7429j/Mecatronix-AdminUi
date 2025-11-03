import React, { useEffect, useState } from "react";
import {
  addBlogAPI,
  getBlogsAPI,
  editBlogAPI,
  deleteBlogAPI,
  uploadImageAPI,
  deleteImageAPI,
} from "../../api/api";
import {
  successNotification,
  errorNotification,
} from "../../helpers/notifi_helper";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]); // multiple image support

  const [form, setForm] = useState({
    blog_name: "",
    short_description: "",
  });

  // ✅ Fetch blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogsAPI();
      if (res?.success) setBlogs(res.data);
      else errorNotification(res?.message);
    } catch (err) {
      errorNotification("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, blog_images: imageUrls }; // multiple image support
      let res;

      if (editMode && selectedBlog) {
        res = await editBlogAPI(selectedBlog._id, payload);
      } else {
        res = await addBlogAPI(payload);
      }

      if (res?.success) {
        successNotification(res.message);
        setModalOpen(false);
        setForm({ blog_name: "", short_description: "" });
        setImageUrls([]);
        fetchBlogs();
      } else errorNotification(res?.message);
    } catch (err) {
      errorNotification("Something went wrong");
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await deleteBlogAPI(id);
      if (res?.success) {
        successNotification("Blog deleted successfully");
        fetchBlogs();
      } else errorNotification(res?.message);
    } catch {
      errorNotification("Delete failed");
    }
  };

  // ✅ Open modal (for Add/Edit)
  const openModal = (blog = null) => {
    if (blog) {
      setEditMode(true);
      setSelectedBlog(blog);
      setForm({
        blog_name: blog.blog_name,
        short_description: blog.short_description,
      });
      setImageUrls(blog.blog_images || []);
    } else {
      setEditMode(false);
      setSelectedBlog(null);
      setForm({ blog_name: "", short_description: "" });
      setImageUrls([]);
    }
    setModalOpen(true);
  };

  // ✅ Upload images
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setUploading(true);
      const res = await uploadImageAPI(formData);

      if (res?.success && Array.isArray(res.files) && res.files.length > 0) {
        const uploaded = res.files.map((f) => f.url);
        setImageUrls((prev) => [...prev, ...uploaded]);
        successNotification("✅ Images uploaded successfully!");
      } else {
        errorNotification("❌ Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      errorNotification("⚠️ Something went wrong during upload.");
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  // ✅ Delete image from AWS
  const handleImageDelete = async (url) => {
    if (!url) return;
    try {
      const res = await deleteImageAPI({ urls: [url] });
      if (res?.success) {
        setImageUrls((prev) => prev.filter((img) => img !== url));
        successNotification("🗑️ Image deleted successfully");
      } else {
        errorNotification(res?.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      errorNotification("Failed to delete image");
    }
  };

  return (
    <div className="p-6 bg-zinc-900/50 rounded-xl shadow-xl border border-zinc-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">📝 Blogs Management</h2>
        <div className="space-x-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-sm"
          >
            Add Blog
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-zinc-700 rounded-lg overflow-hidden">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="p-3">Images</th>
              <th className="p-3">Blog Name</th>
              <th className="p-3">Short Description</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((b) => (
                <tr
                  key={b._id}
                  className="border-t border-zinc-700 hover:bg-zinc-800/50"
                >
                  <td className="p-3 flex gap-2">
                    {Array.isArray(b.blog_images) && b.blog_images.length > 0 ? (
                      b.blog_images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="blog"
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No Images</span>
                    )}
                  </td>
                  <td className="p-3 font-semibold">{b.blog_name}</td>
                  <td className="p-3 text-gray-300">{b.short_description}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        b.is_active
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {b.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => openModal(b)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-400" colSpan={5}>
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Blog" : "Add Blog"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Blog Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Blog Name
                </label>
                <input
                  type="text"
                  name="blog_name"
                  value={form.blog_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none"
                  placeholder="Enter blog name"
                />
              </div>

              {/* Blog Images */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Blog Images
                </label>

                <div className="flex flex-wrap gap-3 mb-3">
                  {imageUrls.map((url, i) => (
                    <div key={i} className="relative">
                      <img
                        src={url}
                        alt="Uploaded"
                        className="w-20 h-20 rounded-md object-cover border border-zinc-700"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(url)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <label className="cursor-pointer inline-block bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm">
                  {uploading ? "Uploading..." : "Upload Images"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleUpload}
                  />
                </label>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Short Description
                </label>
                <textarea
                  name="short_description"
                  value={form.short_description}
                  onChange={handleChange}
                  rows={3}
                  required
                  maxLength={250}
                  placeholder="Enter short description"
                  className="w-full px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
