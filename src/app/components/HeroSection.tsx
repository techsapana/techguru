"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const floatingLogos = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    className: "top-30 left-10",
    duration: 6,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    className: "top-40 right-16",
    duration: 7,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    className: "bottom-20 right-24",
    duration: 8,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    className: "bottom-32 left-20",
    duration: 9,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-blue-100 to-white">
      {/* Floating Logos */}
      {floatingLogos.map((logo, i) => (
        <motion.div
          key={i}
          className={`absolute block ${logo.className} z-0`}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: logo.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={logo.src}
            alt="tech logo"
            width={55}
            height={55}
            className="opacity-20 md:opacity-90 w-8 h-8 md:w-13.75 md:h-13.75"
          />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto px-6 text-center z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl text-gray-400 font-bold leading-tight"
        >
          Your Partner in{" "}
          <span className="bg-linear-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
            Technology
          </span>
          <br />
          <span className="bg-linear-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Success
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-gray-600 font-semibold text-lg md:text-xl max-w-2xl mx-auto"
        >
          Master industry-demand technologies with expert mentors, real
          projects, and career-focused training. TechGuru turns ambition into
          employable skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link href="/courses">
            <button className="px-8 cursor-pointer py-4 rounded-2xl bg-blue-400 text-white font-semibold shadow-lg hover:shadow-blue-200 hover:scale-105 transition">
              Get Started
            </button>
          </Link>

          {/* <button className="px-8 cursor-pointer py-4 rounded-2xl text-white bg-emerald-400 border border-gray-300 font-semibold transition hover:scale-105 duration-100">
            Get Started
          </button> */}
        </motion.div>
      </div>

      <div className="absolute w-125 h-125 bg-emerald-200 rounded-full blur-[140px] opacity-30 -z-10 top-10" />
    </section>
  );
}
