"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "@/src/env";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Play, Trash2, Edit2, CheckCircle, AlertCircle, Loader2, X, Video, Save } from "lucide-react";

interface Video {
  id: number;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt?: string;
}

const API_URL = `${DOMAIN}/api/admin/videos`;

export default function AdminVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  const [totalCount, setTotalCount] = useState(0);

  const fetchVideos = async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("adminToken");
      const [videosRes, countRes] = await Promise.all([
        axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/count`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setVideos(videosRes.data.data || []);
      setTotalCount(countRes.data.data || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load videos");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("video/")) {
        showToast("Please select a video file", "error");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(e.target.files);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile.type.startsWith("video/")) {
        showToast("Please drop a video file", "error");
        return;
      }
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  }, []);

  const handleBulkDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      setFiles(e.dataTransfer.files);
    }
  }, []);

  const handleSubmit = async () => {
    if (!file) {
      showToast("Please select a video", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setSubmitting(true);
      setUploadProgress(0);

      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      showToast("Video uploaded successfully!", "success");
      setFile(null);
      setPreviewUrl(null);
      setFiles(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
      showToast("Failed to upload video", "error");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleBulkSubmit = async () => {
    if (!files || files.length === 0) {
      showToast("Please select videos", "error");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("files", f));

    try {
      setSubmitting(true);
      setUploadProgress(0);

      await axios.post(`${API_URL}/bulk`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      showToast(`${files.length} videos uploaded successfully!`, "success");
      setFiles(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
      showToast("Failed to upload videos", "error");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleUpdate = async () => {
    if (!selectedVideo) {
      showToast("No video selected", "error");
      return;
    }

    if (!file) {
      showToast("Please select a new video file to replace", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setSubmitting(true);
      setUploadProgress(0);

      await axios.put(`${API_URL}/${selectedVideo.id}`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      showToast("Video updated successfully!", "success");
      setSelectedVideo(null);
      setFile(null);
      setPreviewUrl(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
      showToast("Failed to update video", "error");
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: number) => {
    setDeleteModal({ show: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      await axios.delete(`${API_URL}/${deleteModal.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("adminToken")}` },
      });
      showToast("Video deleted successfully!", "success");
      fetchVideos();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete video", "error");
    } finally {
      setDeleteModal({ show: false, id: null });
    }
  };

  const handleEdit = (v: Video) => {
    setSelectedVideo(v);
    setFile(null);
    setPreviewUrl(v.videoUrl);
  };

  const clearForm = () => {
    setSelectedVideo(null);
    setFile(null);
    setPreviewUrl(null);
    setFiles(null);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Video Management</h1>
            <p className="text-gray-600 mt-1">Manage platform showcase videos</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
              Total: {totalCount} videos
            </span>
          </div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {selectedVideo ? (
              <div className="border-2 border-yellow-400 p-6 rounded-xl bg-yellow-50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-yellow-800">Replace Video</h2>
                  <button
                    onClick={clearForm}
                    className="text-gray-500 hover:text-red-600 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Current Video:</p>
                  <video
                    src={previewUrl || undefined}
                    className="w-full h-32 object-contain rounded-lg border-2 border-gray-300"
                    controls
                  />
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    ID: {selectedVideo.id}
                  </p>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition mb-3 ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="replace-video-input"
                  />
                  <label htmlFor="replace-video-input" className="cursor-pointer">
                    {file ? (
                      <div className="py-2">
                        <Video className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="text-sm text-gray-700 font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-green-600 mt-1">Click to change</p>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Select new video to replace
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          MP4, WebM, MOV
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {submitting && (
                  <div className="mb-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    disabled={submitting || !file}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Video
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearForm}
                    disabled={submitting}
                    className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-gray-300 p-6 rounded-xl bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4">Upload Single Video</h2>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="single-video-input"
                  />
                  <label htmlFor="single-video-input" className="cursor-pointer">
                    {previewUrl ? (
                      <video
                        src={previewUrl || undefined}
                        className="w-full h-32 object-contain rounded"
                        controls
                      />
                    ) : (
                      <div className="py-4">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          Drop video here or click to browse
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          MP4, WebM, MOV (max 100MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {file && (
                  <p className="text-sm text-gray-600 mt-2 truncate">
                    Selected: {file.name}
                  </p>
                )}

                {submitting && (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || !file}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Video
                    </>
                  )}
                </button>
              </div>
            )}

            {!selectedVideo && (
              <div className="border-2 border-gray-300 p-6 rounded-xl bg-white shadow-sm">
                <h2 className="text-xl font-bold mb-4">Upload Multiple Videos</h2>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleBulkDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFilesChange}
                  className="hidden"
                  id="multi-video-input"
                />
                <label htmlFor="multi-video-input" className="cursor-pointer">
                  <div className="py-4">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Drop videos here or click to browse
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Select multiple files at once
                    </p>
                  </div>
                </label>
              </div>

              {files && files.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {files.length} video(s) selected
                </p>
              )}

              {submitting && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              <button
                onClick={handleBulkSubmit}
                disabled={submitting || !files}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Upload All"
                )}
              </button>
            </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">
              Videos ({videos.length})
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <Play className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">No videos yet. Upload your first video!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="relative aspect-[9/16] bg-gray-900">
                      <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                      <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-white opacity-70" />
                    </div>

                    <div className="p-3">
                      <p className="text-xs text-gray-500 truncate">
                        {video.videoUrl.split("/").pop()}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(video)}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded font-semibold flex items-center justify-center gap-1 text-sm"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(video.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold flex items-center justify-center gap-1 text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {deleteModal.show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setDeleteModal({ show: false, id: null })}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Delete Video?</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this video? This action cannot
                    be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteModal({ show: false, id: null })}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}