"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Talking from "./Talking";
import BlogCard from "./BlogCard";
import { DOMAIN } from "@/src/env";

interface Blog {
  id: number;
  title: string;
  images?: string[];
}

const BottomSection = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/blogs`);
        const json = await res.json();

        if (json?.success && Array.isArray(json?.data)) {
          setFeaturedBlogs(json.data.slice(0, 6));
        } else {
          setFeaturedBlogs([]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
        setFeaturedBlogs([]);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-sky-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-blue-200/40 blur-[110px]" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-500 text-center md:text-left">
              Insights and updates
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center md:text-left">
              Latest <span className="text-blue-700">Blogs</span>
            </h3>
            <p className="text-slate-600 max-w-2xl text-center md:text-left">
              Practical tips, career guidance, and tech trends curated by the
              TechGuru team.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 mx-auto xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center place-items-center"
          >
            {loadingBlogs
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`blog-skeleton-${index}`}
                    className="w-full max-w-70 sm:max-w-xs h-69 rounded-2xl border border-slate-200 bg-white/95 shadow-md animate-pulse"
                  />
                ))
              : featuredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="w-full flex justify-center"
                  >
                    <BlogCard
                      title={blog.title}
                      imageSrc={blog.images?.[0]}
                      href={`/blogs/${blog.id}`}
                      linkLabel="Read Blog"
                    />
                  </motion.div>
                ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-200/60 hover:bg-blue-700 transition"
            >
              View All Blogs
            </Link>
          </motion.div>
        </motion.div>

        {/* Talking Section */}
        <Talking />
      </div>
    </section>
  );
};

export default BottomSection;
