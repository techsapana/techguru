"use client";

import { DOMAIN } from "@/src/env";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface Category {
  id: number;
  name: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          fetch(`${DOMAIN}/api/public/courses`),
          fetch(`${DOMAIN}/api/public/categories`),
        ]);
        const coursesJson = await coursesRes.json();
        const categoriesJson = await categoriesRes.json();

        console.log("Fetched courses:", coursesJson);
        console.log("Fetched categories:", categoriesJson);

        if (coursesJson.success) {
          setCourses(coursesJson.data);
        }

        if (categoriesJson.success) {
          setCategories([
            "All",
            ...categoriesJson.data.map((c: Category) => c.name),
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 md:h-12 w-64 md:w-96 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-11/12 md:w-2/3 mx-auto animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-10/12 md:w-1/2 mx-auto animate-pulse" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`cat-skeleton-${index}`}
                className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`course-skeleton-${index}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                  <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-50 via-sky-50 to-white pt-24 md:pt-28 pb-16">
      <div className="absolute -top-28 -right-24 h-80 w-80 rounded-full bg-sky-200/60 blur-[120px]" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-amber-200/50 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">
            Courses
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            Explore Our Courses
          </h1>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Discover a wide range of courses across different categories. Learn
            at your own pace, gain industry-ready skills, and take your career
            to the next level.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 cursor-pointer py-2 rounded-full text-sm font-semibold shadow-sm ${
                activeCategory === cat
                  ? "bg-linear-to-r from-blue-300 to-sky-200 text-white shadow-md"
                  : "bg-white/80 border border-slate-200 text-slate-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-2xl border border-slate-200 bg-white/95 shadow-md overflow-hidden transition"
            >
              <div className="relative h-48 bg-sky-50">
                <Image
                  src={course.images?.[0]}
                  alt={course.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-600 mb-2">
                  {course.category}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {course.title}
                </h3>

                <p className="text-slate-600 mb-2">
                  <span className="font-semibold text-slate-700">
                    Duration:
                  </span>{" "}
                  {course.duration}
                </p>

                <Link
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center justify-center bg-linear-to-r from-blue-500 to-sky-500 text-white font-semibold px-5 py-2 rounded-lg transition shadow-sm hover:from-blue-600 hover:to-sky-600 hover:shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <p className="text-center text-slate-500 col-span-full mt-8">
              No courses found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
