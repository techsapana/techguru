"use client";

import { DOMAIN } from "@/src/env";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function AdminManagement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get("adminToken");
      const res = await axios.post(`${DOMAIN}/api/admin/admins`, 
        { username, password },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (res.data.success) {
        setMessage("Admin created successfully!");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(res.data.message || "Failed to create admin");
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || 
        "Something went wrong during admin creation"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Admin</h1>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {message && (
            <div className={`mb-4 p-3 rounded text-sm ${
              message.includes("success") 
                ? "bg-green-100 text-green-700 border border-green-300" 
                : "bg-red-100 text-red-700 border border-red-300"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Creating Admin..." : "Create Admin"}
            </button>
          </form>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Security Note:</h3>
          <p className="text-sm text-gray-600">
            Only existing admins can create new admin accounts. 
            Each admin will have full access to the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
