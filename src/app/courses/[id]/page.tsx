"use client";

import { DOMAIN } from "@/src/env";
import EditorViewer from "@/src/components/EditorViewer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaCheck,
  FaChartLine,
  FaLightbulb,
  FaUserGraduate,
  FaCalendar,
  FaCertificate,
  FaBook,
  FaAward,
} from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

interface Course {
  id: number;
  courseName: string;
  title: string;
  duration: string;
  description: string;
  content: string;
  category: string;
  features: string[];
  images: string[];
}

export default function CoursePage() {
  const params = useParams();
  const id = params.id as string;

  const [activeTab, setActiveTab] = useState("description");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  // const [fullName, setFullName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/courses/${id}`);
        const json = await res.json();
        setCourse(json.data);
      } catch (error) {
        console.error("Failed to load course", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!fullName.trim() || !phoneNumber.trim() || !course) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   setSubmitting(true);

  //   try {
  //     const response = await fetch(`${DOMAIN}/api/enrollments/submit`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fullName,
  //         phoneNumber,
  //         selectionText: `${course.id} - ${course.courseName}`,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert("Enrollment submitted successfully!");
  //       setFullName("");
  //       setPhoneNumber("");
  //     } else {
  //       alert(data.message || "Failed to submit enrollment");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting enrollment:", error);
  //     alert("An error occurred while submitting your enrollment");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-28">
        <section className="relative bg-blue-900 text-white pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-blue-800 rounded animate-pulse" />
                <span>•</span>
                <div className="h-4 w-20 bg-blue-800 rounded animate-pulse" />
                <span>•</span>
                <div className="h-4 w-24 bg-blue-800 rounded animate-pulse" />
              </div>

              <div className="h-8 w-40 bg-blue-800 rounded animate-pulse" />

              <div className="space-y-3">
                <div className="h-12 w-full bg-blue-800 rounded animate-pulse" />
                <div className="h-12 w-5/6 bg-blue-800 rounded animate-pulse" />
              </div>

              <div className="h-6 w-4/5 bg-blue-800 rounded animate-pulse" />

              <div className="space-y-4 pt-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-blue-800 rounded animate-pulse mt-1" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-48 bg-blue-800 rounded animate-pulse" />
                      <div className="h-4 w-full bg-blue-800 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <div className="h-12 w-36 bg-blue-800 rounded-lg animate-pulse" />
              </div>
            </div>

            <div className="bg-white text-gray-700 rounded-xl shadow-2xl p-8">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-${idx === 3 ? "20" : "12"} w-full bg-gray-200 rounded-lg animate-pulse`}
                  />
                ))}
                <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />

              <div className="flex gap-4 mb-8 border-b border-gray-200">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-12 w-32 bg-gray-200 rounded-t-lg animate-pulse"
                  />
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-9/12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-gray-200 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 flex items-center justify-center">
        Course not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-22 bg-linear-to-b from-slate-50 via-sky-50 to-white text-slate-700">
      <div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-sky-200/60 blur-[120px]" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-amber-200/50 blur-[120px]" />

      <section
        className="relative text-white pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(30, 64, 175, 0.72)), url(${course.images?.[0] || "/placeholder.svg"})`,
        }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-start relative z-10">
          <div className="lg:col-span-2 space-y-6">
            <nav className="flex items-center gap-2 text-sm text-slate-200">
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
              <span>•</span>
              <Link href="/#courses" className="hover:text-white transition">
                Courses
              </Link>
              <span>•</span>
              <span className="font-medium">{course.courseName}</span>
            </nav>

            <span className="inline-block bg-linear-to-r from-blue-500 to-sky-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm">
              Professional Course
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {course.courseName}
            </h1>

            <div className="space-y-4 pt-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 md:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
              <p className="inline-block text-base md:text-xl font-semibold bg-linear-to-r from-orange-300 via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,170,0,0.35)]">
                Course Description
              </p>

              {course.description ? (
                <EditorViewer
                  content={course.description}
                  className="text-base -ml-14 md:text-lg leading-relaxed max-w-full [&_.bn-container]:bg-transparent [&_.bn-editor]:bg-transparent [&_.bn-editor]:text-white! [&_.bn-inline-content]:text-white! [&_.bn-block-content]:text-white! [&_.bn-block-content_*]:text-white!"
                />
              ) : (
                <p className="text-white text-base md:text-lg leading-relaxed">
                  Course description will be updated soon.
                </p>
              )}
            </div>

            {/* <div className="flex flex-wrap gap-4 pt-6">
              <Link href="/enroll">
                <button className="cursor-pointer bg-linear-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition shadow-sm">
                  Enroll Now
                </button>
              </Link>
            </div> */}
          </div>

          <div className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-5 md:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
            <h3 className="text-xl font-bold text-white mb-4">
              Course Snapshot
            </h3>

            <div className="space-y-3 mb-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-200 mb-1">
                  Duration
                </p>
                <p className="font-semibold text-white">
                  {course.duration || "Flexible"}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-200 mb-1">
                  Category
                </p>
                <p className="font-semibold text-white">
                  {course.category || "Professional"}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-3 mb-5">
              <p className="text-xs uppercase tracking-wide text-slate-200 mb-2">
                Highlights
              </p>
              <ul className="space-y-2">
                {((course.features ?? []).slice(0, 4).length > 0
                  ? (course.features ?? []).slice(0, 4)
                  : [
                      "Hands-on practical sessions",
                      "Mentor guidance and support",
                      "Project-focused learning path",
                    ]
                ).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-white/95"
                  >
                    <FaCheck className="text-emerald-300 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/enroll" className="block">
              <button className="w-full cursor-pointer bg-linear-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-sm">
                Enroll in this Course
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: FaChartLine, value: "1200+", label: "Students Enrolled" },
            { icon: FaLightbulb, value: "50+", label: "Practical Projects" },
            { icon: FaUserGraduate, value: "95%", label: "Placement Rate" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/95 border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition"
            >
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <stat.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">
                {stat.value}
              </h3>
              <p className="font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Master <span className="text-blue-600">{course.courseName}</span>{" "}
              from Scratch
            </h2>

            <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-200">
              {["description", "syllabus"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 font-semibold rounded-t-xl transition-colors ${activeTab === tab ? "bg-linear-to-r from-blue-500 to-sky-500 text-white" : "text-slate-600 hover:text-sky-700"}`}
                >
                  {tab === "description" ? (
                    <span className="inline-flex items-center gap-2">
                      <MdOutlineDescription className="text-lg" />
                      Description
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <FaBook className="text-base" />
                      Syllabus
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-white/95 p-6 rounded-2xl border border-slate-200 shadow-sm">
              {activeTab === "description" && (
                <div className="space-y-6">
                  {course.description || course.content ? (
                    <EditorViewer
                      content={course.content}
                      className="text-base -ml-14 md:text-lg leading-relaxed [&_.bn-container]:bg-transparent [&_.bn-editor]:bg-transparent"
                    />
                  ) : (
                    <p className="text-slate-600">
                      Course description will be updated soon.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(course.features ?? []).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-sky-50/70 border border-sky-100 p-3 rounded-xl"
                    >
                      <FaCheck className="text-emerald-500 mt-1" />
                      <p>{feature}</p>
                    </div>
                  ))}
                  {(course.features ?? []).length === 0 && (
                    <p className="text-slate-500 col-span-full">
                      Curriculum details will be updated soon.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {[
              { icon: FaCalendar, title: "Duration", value: "3-4 Months" },
              {
                icon: FaCertificate,
                title: "Certification",
                value: "Industry-Recognized Certificate",
              },
              { icon: FaBook, title: "Mode", value: "Online & Offline" },
              { icon: FaAward, title: "Level", value: "Beginner to Advanced" },
            ].map((info, idx) => (
              <div
                key={idx}
                className="bg-white/95 p-6 rounded-2xl border border-slate-200 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <info.icon className="text-sky-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{info.title}</h4>
                  <p className="text-slate-600 text-sm">
                    {info.title === "Duration"
                      ? course.duration || info.value
                      : info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
