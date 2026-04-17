"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const WORDS = ["Technology", "Success", "Career", "Tech World", "Innovation"];

const floatingTech = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    position: "top-12 left-8 md:top-16 md:left-16",
    delay: 0,
    duration: 20,
    size: "w-8 h-8 md:w-13 md:h-13",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    position: "top-1/4 right-8 md:top-1/3 md:right-16",
    delay: 2,
    duration: 22,
    size: "w-8 h-8 md:w-12 md:h-12",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    position: "bottom-32 left-12 md:bottom-40 md:left-24",
    delay: 4,
    duration: 18,
    size: "w-7 h-7 md:w-11 md:h-11",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    position: "top-1/3 left-1/4 md:top-40 md:left-32",
    delay: 1,
    duration: 24,
    size: "w-7 h-7 md:w-11 md:h-11",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    position: "bottom-24 right-12 md:bottom-32 md:right-20",
    delay: 3,
    duration: 19,
    size: "w-8 h-8 md:w-12 md:h-12",
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    position: "top-48 right-20 md:top-64 md:right-32",
    delay: 5,
    duration: 21,
    size: "w-8 h-8 md:w-12 md:h-12",
  },
];

const wordVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cursorVariants = {
  blink: {
    opacity: [0, 1, 0],
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<{ top: string; left: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
      setParticles(
        [...Array(20)].map(() => ({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 2,
        }))
      );
    }, 300);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* === BACKGROUND LAYERS === */}

      {/* Top-Right Large Indigo/Purple Glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.4)_0%,_rgba(139,92,246,0.2)_40%,_transparent_70%)] blur-[100px] animate-pulse-slow opacity-60" />

      {/* Bottom-Left Blue Glow */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.35)_0%,_rgba(96,165,250,0.15)_50%,_transparent_70%)] blur-[90px] animate-pulse-slow-delayed opacity-50" />

      {/* Animated Floating Blobs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-56 h-56 bg-linear-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-[80px] opacity-50"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-1/4 w-72 h-72 bg-linear-to-br from-blue-500/15 to-cyan-500/10 rounded-full blur-[100px] opacity-40"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-linear-to-br from-violet-500/10 to-fuchsia-500/5 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Subtle Animated Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{ top: particle.top, left: particle.left }}
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* === FLOATING TECH ICONS === */}
      {floatingTech.map((tech, i) => (
        <motion.div
          key={i}
          className={`absolute ${tech.position} z-10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [1, 1.1, 1],
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: tech.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: tech.delay,
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image src={tech.src} alt="tech logo" width={52} height={52} className={`${tech.size} drop-shadow-lg`} />
        </motion.div>
      ))}

      {/* === RIGHT SIDE VISUAL - GLASSMORPHISM DASHBOARD CARD === */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-4 md:right-16 top-1/2 -translate-y-1/2 hidden xl:block z-20"
      >
        <div className="relative w-72 h-80 md:w-80 md:h-96">
          {/* Glass card with blur and border */}
          <div className="absolute inset-0 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-white/60 text-xs ml-2 font-mono">dashboard — main.tsx</span>
            </div>
            {/* Code Content */}
            <div className="p-4 font-mono text-xs space-y-3">
              <div className="flex gap-2">
                <span className="text-purple-400">import</span>
                <span className="text-blue-300">{'{'}</span>
                <span className="text-yellow-300">React</span>
                <span className="text-blue-300">{'}'}</span>
                <span className="text-purple-400">from</span>
                <span className="text-green-300">'react'</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-400">import</span>
                <span className="text-blue-300">{'{'}</span>
                <span className="text-yellow-300">useState</span>
                <span className="text-blue-300">{'}'}</span>
                <span className="text-purple-400">from</span>
                <span className="text-green-300">'react'</span>
                <span className="text-gray-500">;</span>
              </div>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex gap-2">
                <span className="text-blue-400">const</span>
                <span className="text-white"> Dashboard </span>
                <span className="text-blue-300">=</span>
                <span className="text-blue-300">(</span>
                <span className="text-gray-500">) =&gt; {'{'}</span>
              </div>
              <div className="flex gap-2 pl-4">
                <span className="text-blue-400">const</span>
                <span className="text-white"> [data</span>
                <span className="text-blue-300">,</span>
                <span className="text-white"> setData] </span>
                <span className="text-blue-300">=</span>
                <span className="text-blue-400"> useState</span>
                <span className="text-gray-300">([]</span>
                <span className="text-gray-500">);</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">return</span>
                <span className="text-gray-300"> (</span>
              </div>
              <div className="pl-8 text-green-300">
                &lt;div className=&quot;card&quot;&gt;
              </div>
              <div className="pl-12 text-green-300">
                &lt;Chart /&gt;
              </div>
              <div className="pl-8 text-green-300">
                &lt;/div&gt;
              </div>
              <div className="pl-4">
                <span className="text-gray-300">);</span>
              </div>
              <div className="text-blue-300">{'}'}</div>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex gap-2 text-cyan-300">
                <span className="animate-pulse">_</span>
                <span className="text-gray-500">// ready</span>
              </div>
            </div>
            {/* Glow effect inside card */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-linear-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
          </div>

          {/* Floating accent glow behind card */}
          <div className="absolute -inset-4 bg-linear-to-br from-blue-500/20 to-purple-500/20 blur-2xl -z-10" />
        </div>
      </motion.div>

      {/* === HERO CONTENT === */}
      <div className="max-w-5xl mx-auto px-6 text-center z-30 relative">
        {/* Glassmorphism backdrop panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_8px_64px_rgba(0,0,0,0.2)]"
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight tracking-tight"
          >
            Your Partner in{" "}
            <span className="inline-flex items-center relative">
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text inline-block min-w-[200px] md:min-w-[280px] text-left font-extrabold">
                <AnimatePresence mode="wait">
                  {isMounted && (
                    <motion.span
                      key={index}
                      variants={wordVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="block"
                    >
                      {WORDS[index]}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isMounted && <span className="block">{WORDS[0]}</span>}
              </span>

              {/* Glow effect behind "Success" */}
              {isMounted && WORDS[index] === "Success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-4 bg-linear-to-r from-yellow-400/30 via-amber-400/20 to-orange-400/30 rounded-2xl blur-2xl -z-10"
                />
              )}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-gray-300 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-2xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 text-white font-semibold shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="relative z-10">Get Started</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* === CSS ANIMATIONS === */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow-delayed { animation: pulse-slow-delayed 5s ease-in-out infinite; }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 0.6s ease-in-out; }
      `}</style>
    </section>
  );
}
