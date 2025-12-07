"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getContent,
  createContent,
  updateContent,
  deleteContent,
} from "@/lib/api";

export default function Home() {
  const { user, logout } = useAuth();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000${imagePath}`;
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await getContent();
      setContent(data);
    } catch (err) {
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (formData.title.length < 3) {
      setError("Title must be at least 3 characters");
      setSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingId) {
        await updateContent(editingId, formDataToSend);
        setSuccess("Content updated successfully!");
      } else {
        await createContent(formDataToSend);
        setSuccess("Content created successfully!");
      }
      resetForm();
      fetchContent();
    } catch (err) {
      setError(err.message || "Failed to save content");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: null,
    });
    setEditingId(item.id);
    setImagePreview(getImageUrl(item.image));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      await deleteContent(id);
      setSuccess("Content deleted successfully!");
      fetchContent();
    } catch (err) {
      setError(err.message || "Failed to delete content");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image: null });
    setEditingId(null);
    setImagePreview(null);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/netflix-3.svg" alt="Netflix" className="w-28 h-auto" />
              <span className="text-neutral-400">|</span>
              <h1 className="text-xl font-semibold">Content Manager</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-400 text-sm">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="bg-neutral-900 rounded-lg p-6 mb-8 border border-neutral-800">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? "Edit Content" : "Create New Content"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-2 text-neutral-300"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                maxLength={20}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition"
                placeholder="Enter title (max 20 characters)"
              />
              <p className="text-xs text-neutral-500 mt-1">
                {formData.title.length}/20 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 text-neutral-300"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2.5 text-white focus:border-red-500 focus:outline-none transition resize-none"
                placeholder="Enter description"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium mb-2 text-neutral-300"
              >
                Image {!editingId && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!editingId}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2.5 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white file:cursor-pointer hover:file:bg-red-700 focus:border-red-500 focus:outline-none transition"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Max size: 5MB | Formats: JPG, PNG, WEBP
              </p>
            </div>

            {imagePreview && (
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  Preview
                </label>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded border border-neutral-700"
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed px-6 py-2.5 rounded font-medium transition"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Content"
                  : "Create Content"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-neutral-700 hover:bg-neutral-600 px-6 py-2.5 rounded font-medium transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">My Content</h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 animate-pulse"
                >
                  <div className="w-full h-48 bg-neutral-800"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-neutral-800 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-800 rounded"></div>
                    <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : content.length === 0 ? (
            <div className="text-center py-12 bg-neutral-900 rounded-lg border border-neutral-800">
              <p className="text-neutral-400 text-lg">
                No content yet. Create your first content above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-700 transition"
                >
                  {/* Image */}
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="text-xs text-neutral-500 mb-4">
                      <p>
                        Created:{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                      {item.updated_at !== item.created_at && (
                        <p>
                          Updated:{" "}
                          {new Date(item.updated_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
