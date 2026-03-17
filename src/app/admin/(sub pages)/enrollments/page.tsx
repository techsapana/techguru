"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "@/src/env";

interface Enrollment {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  course: string;
  educationLevel: string;
  preferredLearningPlatform: string;
  hasLaptop: string;
  status: string;
  submittedAt: string;
}

type EnrollmentStatus = "PENDING" | "APPROVED" | "REJECTED";
type EnrollmentFilter = "ALL" | EnrollmentStatus;

const API_URL = `${DOMAIN}/api/enrollments`;

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<EnrollmentFilter>("ALL");

  /* ---------------- FETCH ---------------- */
  const fetchEnrollments = async (status: EnrollmentFilter) => {
    setLoading(true);
    setError("");

    try {
      const token = Cookies.get("adminToken");
      const endpoint =
        status === "ALL" ? API_URL : `${API_URL}/status/${status}`;

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load enrollments");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEnrollments(selectedStatus);
  }, [selectedStatus]);

  /* ---------------- APPROVE / REJECT ---------------- */

  const handleAction = async (id: number, action: "approve" | "reject") => {
    try {
      setProcessingId(id);

      const token = Cookies.get("adminToken");

      await axios.put(
        `${API_URL}/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchEnrollments(selectedStatus);
    } catch (err) {
      console.error(err);
      alert("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Enrollments</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">
          {selectedStatus === "ALL"
            ? "All Enrollments"
            : `${selectedStatus} Enrollments`}{" "}
          ({enrollments.length})
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {(
            ["ALL", "PENDING", "APPROVED", "REJECTED"] as EnrollmentFilter[]
          ).map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-semibold border transition-colors ${
                selectedStatus === status
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading enrollments...</p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600">No enrollments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.map((e) => (
              <div
                key={e.id}
                className="border-2 border-gray-300 p-6 rounded-lg bg-white shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{e.fullName}</h3>

                    <p className="text-sm text-gray-700">📞 {e.phoneNumber}</p>

                    <p className="text-sm text-gray-700">✉ {e.email}</p>

                    <p className="mt-2">
                      <span className="font-semibold">Course:</span> {e.course}
                    </p>

                    <p>
                      <span className="font-semibold">Education:</span>{" "}
                      {e.educationLevel}
                    </p>

                    <p>
                      <span className="font-semibold">Platform:</span>{" "}
                      {e.preferredLearningPlatform}
                    </p>

                    <p>
                      <span className="font-semibold">Has Laptop:</span>{" "}
                      {e.hasLaptop}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Submitted: {new Date(e.submittedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        e.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : e.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {e.status}
                    </span>

                    {e.status === "PENDING" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          disabled={processingId === e.id}
                          onClick={() => handleAction(e.id, "approve")}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm disabled:bg-green-300"
                        >
                          {processingId === e.id ? "Processing..." : "Approve"}
                        </button>

                        <button
                          disabled={processingId === e.id}
                          onClick={() => handleAction(e.id, "reject")}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm disabled:bg-red-300"
                        >
                          {processingId === e.id ? "Processing..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
