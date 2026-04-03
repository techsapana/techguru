"use client";

import { DOMAIN } from "@/src/env";
import { useState } from "react";
import Link from "next/link";

export default function AdminForgotPassword() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${DOMAIN}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setMessage(result.message || "Failed to process request");
        return;
      }

      setMessage("Password reset instructions have been sent to your email if the account exists.");
    } catch (error) {
      setMessage(
        "Something went wrong: " +
          (error instanceof Error ? error.message : String(error)),
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-black">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Enter your username to receive password reset instructions.
        </p>

        {message && (
          <div className={`p-3 rounded text-sm text-center ${
            message.includes("sent") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>

        <div className="text-center space-y-2">
          <Link
            href="/admin/login"
            className="text-blue-600 hover:text-blue-800 text-sm block"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
