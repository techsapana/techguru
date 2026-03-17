"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "@/src/env";
import Editor from "@/src/components/Editor";

interface Course {
  id: number;
  courseName: string;
  title: string;
  duration: string;
  description: string;
  content: string;
  category: string;
  categoryId?: number;
  features: string[];
  images: string[];
}

interface Category {
  id: number;
  name: string;
}

const API_URL = `${DOMAIN}/api/admin/courses`;

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    courseName: "",
    title: "",
    duration: "",
    description: "",
    content: "",
    categoryId: "",
    features: [""],
    images: [] as File[],
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/public/categories`);
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("adminToken");
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    idx?: number,
  ) => {
    const { name, value } = e.target;
    if (name === "features" && typeof idx === "number") {
      const newFeatures = [...form.features];
      newFeatures[idx] = value;
      setForm({ ...form, features: newFeatures });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const addFeature = () =>
    setForm({ ...form, features: [...form.features, ""] });
  const removeFeature = (idx: number) => {
    const newFeatures = form.features.filter((_, i) => i !== idx);
    setForm({ ...form, features: newFeatures });
  };

  const handleSubmit = async () => {
    if (saving) return;
    if (!form.courseName.trim()) return alert("Please enter course name");
    if (!form.title.trim()) return alert("Please enter title");
    if (!form.description.trim()) return alert("Please enter description");
    if (!form.categoryId) return alert("Please select a category");

    const descriptionContent = form.description;
    const contentData = form.content;

    const formData = new FormData();
    formData.append(
      "course",
      JSON.stringify({
        courseName: form.courseName,
        title: form.title,
        duration: form.duration,
        description: descriptionContent,
        content: contentData,
        categoryId: Number(form.categoryId),
        features: form.features.filter((f) => f.trim()),
      }),
    );
    form.images.forEach((img) => formData.append("images", img));

    try {
      setSaving(true);
      if (selected) {
        await axios.put(`${API_URL}/${selected.id}`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("adminToken")}`,
          },
        });
      }

      alert("Success!");
      setForm({
        courseName: "",
        title: "",
        duration: "",
        description: "",
        content: "",
        categoryId: "",
        features: [""],
        images: [],
      });
      setSelected(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("adminToken")}` },
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  const handleEdit = (c: Course) => {
    const matchedCategoryId =
      c.categoryId ?? categories.find((cat) => cat.name === c.category)?.id;

    setSelected(c);
    setForm({
      courseName: c.courseName,
      title: c.title,
      duration: c.duration,
      description: c.description,
      content: c.content,
      categoryId: matchedCategoryId ? String(matchedCategoryId) : "",
      features: c.features,
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Course Management</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* FORM (TOP, BIGGER) */}
        <div className="border-2 border-gray-300 p-8 rounded-xl bg-white shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {selected ? "Edit Course" : "Add New Course"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="courseName"
              value={form.courseName}
              placeholder="Course Name"
              onChange={handleChange}
              className="border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="title"
              value={form.title}
              placeholder="Title"
              onChange={handleChange}
              className="border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="duration"
              value={form.duration}
              placeholder="Duration"
              onChange={handleChange}
              className="border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500"
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="border-2 border-gray-300 p-4 text-lg rounded focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="font-semibold text-lg block mb-3">
              Description:
            </label>
            <Editor
              value={form.description}
              onChange={(value: string) =>
                setForm({ ...form, description: value })
              }
            />
          </div>

          <div className="mt-6">
            <label className="font-semibold text-lg block mb-3">
              Full Content:
            </label>
            <Editor
              value={form.content}
              onChange={(value: string) => setForm({ ...form, content: value })}
            />
          </div>

          {/* FEATURES */}
          <div className="mt-6">
            <label className="font-semibold text-lg block mb-3">
              Features:
            </label>

            <div className="space-y-3">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    type="text"
                    name="features"
                    value={f}
                    onChange={(e) => handleChange(e, i)}
                    placeholder={`Feature ${i + 1}`}
                    className="border-2 border-gray-300 p-3 text-lg flex-1 rounded focus:outline-none focus:border-blue-500"
                  />

                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 rounded font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addFeature}
              className="text-blue-600 font-semibold mt-3 text-lg"
            >
              + Add Feature
            </button>
          </div>

          {/* IMAGES */}
          <div className="mt-6">
            <label className="font-semibold text-lg block mb-2">Images:</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border-2 border-gray-300 p-3 w-full rounded"
            />
            {form.images.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {form.images.length} file(s) selected
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold text-lg"
            >
              {saving
                ? selected
                  ? "Updating..."
                  : "Creating..."
                : selected
                  ? "Update Course"
                  : "Create Course"}
            </button>

            {selected && (
              <button
                disabled={saving}
                onClick={() => {
                  setSelected(null);
                  setForm({
                    courseName: "",
                    title: "",
                    duration: "",
                    description: "",
                    content: "",
                    categoryId: "",
                    features: [""],
                    images: [],
                  });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded font-semibold text-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* COURSES LIST (BELOW FORM) */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Courses ({courses?.length})
          </h2>

          {loading ? (
            <p className="text-gray-600">Loading courses...</p>
          ) : courses?.length === 0 ? (
            <div className="text-center py-10 bg-gray-100 rounded-lg">
              No courses yet. Create one to get started!
            </div>
          ) : (
            <div className="space-y-5">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="border-2 border-gray-300 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-bold text-xl mb-1">{c.courseName}</h3>
                  <p className="mb-2 text-gray-700">
                    {c.title} • {c.duration} • {c.category}
                  </p>

                  {c.features.length > 0 && (
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Features:</span>{" "}
                      {c.features.join(", ")}
                    </p>
                  )}

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                    >
                      Delete
                    </button>
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
