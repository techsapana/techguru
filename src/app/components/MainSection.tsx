"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Card from "./Card";
import { DOMAIN } from "@/src/env";
import Image from "next/image";

interface Course {
  id: number;
  courseName?: string;
  title?: string;
  duration?: string;
  description?: string;
  category?: string;
  images?: string[];
}

interface Partner {
  id: number;
  imageUrl: string;
}

const MainSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(true);

  const featuredCourses = courses.slice(0, 4);

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

    const fetchPartners = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/partners`);
        const json = await res.json();
        if (json?.success) {
          setPartners(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setPartnersLoading(false);
      }
    };

    fetchCourses();
    fetchPartners();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 bg-linear-to-b from-sky-50 via-white to-white">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-[110px]" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-200/50 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-12 text-center lg:text-left"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Explore our <span className="text-blue-700">Courses</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto lg:mx-0"
          >
            At TechGuru, we help learners build job-ready skills, earn trusted
            certifications, and grow a portfolio that stands out. Every track is
            practical, mentor-led, and aligned with today&apos;s tech roles.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center lg:text-left"
          >
            Academic Programs
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center"
          >
            {coursesLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={`course-skeleton-${index}`}
                  variants={itemVariants}
                  className="w-64 h-80 rounded-2xl bg-blue-50 animate-pulse border border-blue-100"
                />
              ))}

            {!coursesLoading && featuredCourses.length === 0 && (
              <motion.p
                variants={itemVariants}
                className="text-slate-500 col-span-full text-center"
              >
                No courses available at the moment.
              </motion.p>
            )}

            {!coursesLoading &&
              featuredCourses.map((course) => {
                const title = course.title || course.courseName || "Course";
                const subtitle =
                  course.duration || course.category || "Available now";

                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="w-full"
                  >
                    <Card
                      imageSrc={course.images?.[0] || "/placeholder.svg"}
                      title={title}
                      subtitle={subtitle}
                      href={`/courses/${course.id}`}
                    />
                  </motion.div>
                );
              })}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-2"
        >
          <motion.h2
            variants={itemVariants}
            id="partners"
            className="scroll-mt-30 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center"
          >
            Our <span className="text-blue-700">Partners</span>
          </motion.h2>

          {partnersLoading ? (
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 md:p-8">
              <div className="flex gap-6 overflow-hidden max-w-7xl mx-auto px-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="w-48 h-32 bg-sky-50 rounded-2xl animate-pulse shrink-0 border border-slate-200"
                  />
                ))}
              </div>
            </div>
          ) : partners.length === 0 ? (
            <motion.p
              variants={itemVariants}
              className="text-center text-slate-500"
            >
              No partners available.
            </motion.p>
          ) : partners.length <= 5 ? (
            <motion.div
              variants={containerVariants}
              className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 md:p-8 flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="flex items-center justify-center w-48 h-32 bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-2 hover:shadow-md hover:border-sky-300 transition-all duration-300 group"
                >
                  <Image
                    src={partner.imageUrl}
                    alt="Partner"
                    width={160}
                    height={80}
                    className="max-w-full max-h-20 object-contain grayscale rounded-xl group-hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-linear-to-r from-sky-50 via-white to-sky-50 py-8 px-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-sky-50 to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-sky-50 to-transparent z-10" />
              <div className="flex gap-6 animate-scroll">
                {[...partners, ...partners, ...partners].map((partner, i) => (
                  <div
                    key={`${partner.id}-${i}`}
                    className="flex items-center justify-center w-48 h-32 bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-2 shrink-0 hover:shadow-md hover:border-sky-300 transition-all duration-300 group"
                  >
                    <Image
                      src={partner.imageUrl}
                      alt="Partner"
                      width={160}
                      height={80}
                      className="max-w-full max-h-20 object-contain grayscale rounded-xl group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default MainSection;
