"use client";

import { useEffect, useMemo, useState } from "react";
import { DOMAIN } from "@/src/env";

interface Course {
  id: number;
  courseName?: string;
  title?: string;
}

const EDUCATION_LEVELS = [
  "High School",
  "Diploma",
  "Bachelor's",
  "Master's",
  "Other",
];

const LEARNING_FORMATS = [
  { label: "Online", value: "ONLINE" },
  { label: "Physical", value: "PHYSICAL" },
  { label: "Hybrid", value: "HYBRID" },
];

export default function EnrollPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [preferredLearningPlatform, setPreferredLearningPlatform] =
    useState("");
  const [hasLaptop, setHasLaptop] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/courses`);
        const json = await res.json();
        if (json?.success) {
          setCourses(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const selectedCourse = useMemo(
    () => courses.find((course) => String(course.id) === courseId),
    [courses, courseId],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitMessage(null);

    if (
      !fullName.trim() ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !courseId ||
      !educationLevel ||
      !preferredLearningPlatform ||
      !hasLaptop
    ) {
      setSubmitMessage("Please complete all fields before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const enrollmentPayload = {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        course:
          selectedCourse?.title ||
          selectedCourse?.courseName ||
          String(courseId),
        educationLevel,
        preferredLearningPlatform,
        hasLaptop,
      };

      const response = await fetch(`${DOMAIN}/api/enrollments/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentPayload),
      });

      const data = await response.json();

      if (response.ok) {
        await fetch("https://formspree.io/f/xnjbevyn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            subject: "New Enrollment Submission",
            ...enrollmentPayload,
          }),
        });

        setSubmitMessage("Enrollment submitted successfully.");
        setFullName("");
        setPhoneNumber("");
        setEmail("");
        setCourseId("");
        setEducationLevel("");
        setPreferredLearningPlatform("");
        setHasLaptop("");
      } else {
        setSubmitMessage(data?.message || "Failed to submit enrollment.");
      }
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      setSubmitMessage("An error occurred while submitting your enrollment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-slate-50">
      <section className="relative overflow-hidden pt-24 pb-14 md:pt-28 md:pb-20">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/50 blur-[120px]" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-sky-200/60 blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-r from-blue-700 via-sky-600 to-cyan-500 text-white rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-lg">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] text-blue-100">
                Enrollment
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                Ready to level up? Enroll now.
              </h1>
              <p className="text-blue-100 mt-4 text-base sm:text-lg">
                Master the skills that matter. Share your details, pick a
                course, and our team will guide you through the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-10 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Full name
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Course
                  </span>
                  <select
                    value={courseId}
                    onChange={(event) => setCourseId(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  >
                    <option value="" disabled>
                      {coursesLoading
                        ? "Loading courses..."
                        : "Select a course"}
                    </option>
                    {!coursesLoading &&
                      courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title || course.courseName || "Course"}
                        </option>
                      ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Education level
                  </span>
                  <select
                    value={educationLevel}
                    onChange={(event) => setEducationLevel(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  >
                    <option value="" disabled>
                      Select your education level
                    </option>
                    {EDUCATION_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">
                    Preferred learning platform
                  </span>
                  <select
                    value={preferredLearningPlatform}
                    onChange={(event) =>
                      setPreferredLearningPlatform(event.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  >
                    <option value="" disabled>
                      Select a platform
                    </option>
                    {LEARNING_FORMATS.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
                <p className="text-sm font-semibold text-slate-700">
                  Do you have a laptop?
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {["YES", "NO"].map((value) => (
                    <label
                      key={value}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        hasLaptop === value
                          ? "border-blue-500 bg-blue-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="hasLaptop"
                        value={value}
                        checked={hasLaptop === value}
                        onChange={(event) => setHasLaptop(event.target.value)}
                        className="sr-only cursor-pointer"
                        required
                      />
                      {value === "YES" ? "Yes, I have one" : "No, I need one"}
                    </label>
                  ))}
                </div>
              </div>

              {submitMessage && (
                <div className="rounded-xl border cursor-pointer border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  {submitMessage}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-xs text-slate-500">
                  We will contact you within 24 hours after receiving your
                  enrollment request.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="enroll-ripple-btn inline-flex items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  <span className="relative z-10">
                    {submitting ? "Submitting..." : "Submit enrollment"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
