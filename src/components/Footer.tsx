"use client";

import { DOMAIN } from "@/src/env";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

interface Course {
  id: number;
  title: string;
  courseName?: string;
}

const Footer = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/courses`);
        const json = await res.json();
        if (json?.success) {
          setCourses(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch courses for footer:", error);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const visibleCourses = courses.slice(0, 6);

  return (
    <footer
      id="footer"
      className="bg-linear-to-br from-sky-100 via-white to-blue-100 text-slate-900 px-6 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto md:px-8 lg:px-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/techguru.png"
                  alt="TechGuru"
                  width={180}
                  height={48}
                  className="w-auto h-12 object-contain"
                />
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                TechGuru helps learners build real-world skills through
                practical training, expert mentorship, and career-focused
                guidance. Stay ahead with programs shaped by today&apos;s tech
                landscape.
              </p>
              <p className="text-sm text-blue-700 font-medium">
                Building careers with TechGuru
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 text-lg font-semibold mb-5 uppercase">
                Available Courses
              </h4>
              <ul className="space-y-3 text-sm">
                {coursesLoading &&
                  Array.from({ length: 6 }).map((_, index) => (
                    <li
                      key={`course-skeleton-${index}`}
                      className="h-4 w-3/4 bg-white/10 rounded animate-pulse"
                    />
                  ))}

                {!coursesLoading && visibleCourses.length === 0 && (
                  <li className="text-gray-400">No courses available.</li>
                )}

                {!coursesLoading &&
                  visibleCourses.map((course) => {
                    const label = course.courseName || course.title;
                    return (
                      <li key={course.id}>
                        <Link
                          href={`/courses/${course.id}`}
                          className="text-slate-700 hover:text-blue-700 transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 text-lg font-semibold mb-5 uppercase tracking-wide">
                Contact Us
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <FiMail className="text-blue-600 text-xl mt-1" />
                  <div>
                    <a
                      href="mailto:infotechguru07@gmail.com"
                      className="text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      infotechguru07@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <FiMapPin className="text-blue-600 text-xl mt-1" />
                  <span className="text-slate-700">
                    Dakshinkali Marg, Lalitpur
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <FiPhone className="text-blue-600 text-xl mt-1" />
                  <div className="space-y-1">
                    <div>
                      <a
                        href="tel:+9779849447862"
                        className="text-slate-700 hover:text-blue-700 transition-colors"
                      >
                        +977 984-9447862
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-100 text-center text-sm text-slate-500 w-full">
          <p>© {new Date().getFullYear()} TechGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
