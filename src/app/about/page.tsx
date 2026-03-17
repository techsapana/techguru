"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const floatingLogos = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    className: "top-40 left-12",
    duration: 7,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    className: "top-32 right-20",
    duration: 8,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    className: "bottom-32 right-16",
    duration: 6,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    className: "bottom-24 left-24",
    duration: 9,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    className: "top-1/2 right-32",
    duration: 7.5,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    className: "top-1/3 left-12",
    duration: 8.5,
  },
];

const highlights = [
  {
    title: "Outcome-driven learning",
    description:
      "We focus on skills that translate directly to real work and hiring needs.",
  },
  {
    title: "Mentor feedback loops",
    description:
      "Guidance at every step, from first concept to final project delivery.",
  },
  {
    title: "Project-first curriculum",
    description:
      "Build a portfolio that shows what you can do, not just what you know.",
  },
  {
    title: "Career acceleration",
    description:
      "Interview prep, resume reviews, and hiring insights baked in.",
  },
];

const stats = [
  { label: "Learners trained", value: "2,000+" },
  { label: "Mentor response", value: "< 24 hours" },
  { label: "Portfolio builds", value: "120+" },
  { label: "Hiring partners", value: "30+" },
];

const pillars = [
  {
    title: "Mentor-led cohorts",
    description:
      "Learn with guidance from experienced mentors who keep you on track.",
  },
  {
    title: "Project-first learning",
    description:
      "Build portfolio-ready projects that prove your skills to employers.",
  },
  {
    title: "Career acceleration",
    description:
      "Interview prep, resume help, and hiring support from day one.",
  },
  {
    title: "Industry alignment",
    description:
      "Curriculum shaped by market needs so you learn what matters now.",
  },
];

const points = [
  "Globally aligned certifications with practical outcomes.",
  "Career coaching, soft skills, and interview prep.",
  "Hands-on builds and challenges that mimic real work.",
  "Curriculum shaped with industry partners and mentors.",
  "A growing TechGuru community of learners and alumni.",
  "Continuous feedback loops to improve every cohort.",
  "Project-first learning to build a strong portfolio.",
  "Job-ready training that matches current hiring needs.",
];

const mid = Math.ceil(points.length / 2);
const leftColumn = points.slice(0, mid);
const rightColumn = points.slice(mid);

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-linear-to-b from-white via-sky-50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
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

      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-[110px]" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-200/50 blur-[110px]" />

      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-500">
              About TechGuru
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              We help ambitious learners build real tech careers.
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl">
              TechGuru is a modern training institute built for today&apos;s
              hiring market. We combine mentor-led instruction with hands-on
              projects and career coaching so you can ship real work and stand
              out.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="rounded-2xl border border-blue-100 bg-white/70 px-4 py-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-5">
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-2xl border border-blue-100 bg-linear-to-br from-white to-blue-50 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {item.description}
                </p>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="rounded-2xl bg-blue-700 text-white p-6 shadow-lg"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-blue-100">
                Our mission
              </p>
              <p className="text-lg font-semibold mt-3">
                Make world-class tech education accessible, practical, and
                career-focused.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mb-16"
      >
        <div className="relative mt-5 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-stretch">
            <motion.div
              variants={itemVariants}
              className="rounded-3xl bg-linear-to-br from-blue-700 via-blue-600 to-sky-500 text-white p-8 md:p-10 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">
                  Why TechGuru
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                  A learning experience built for real careers.
                </h2>
                <p className="text-base sm:text-lg text-blue-100">
                  TechGuru combines mentor-led guidance, hands-on projects, and
                  career support to help you ship real work and stand out in the
                  market.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "2000+ learners", detail: "Active community" },
                  { label: "Project-first", detail: "Portfolio driven" },
                  { label: "Career prep", detail: "Job-ready support" },
                  { label: "Mentor access", detail: "1:1 feedback" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/15 px-4 py-3"
                  >
                    <p className="text-white font-semibold">{stat.label}</p>
                    <p className="text-blue-100 text-xs mt-1">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-blue-100 bg-white p-6 md:p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {pillars.map((pillar) => (
                  <motion.div
                    key={pillar.title}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="rounded-2xl border border-blue-100 bg-linear-to-br from-white to-blue-50 p-5"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2">
                      {pillar.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 border border-blue-100 p-5">
                <p className="text-sm font-semibold text-blue-700 mb-3">
                  What you get
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[...leftColumn.slice(0, 2), ...rightColumn.slice(0, 2)].map(
                    (point) => (
                      <div key={point} className="flex gap-3 items-start">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                        <p className="text-sm text-slate-700">{point}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
