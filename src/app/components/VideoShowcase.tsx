"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { DOMAIN } from "@/src/env";
import { Play } from "lucide-react";

type Video = {
  id: number;
  videoUrl: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function VideoShowcase() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${DOMAIN}/api/public/videos`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        if (json?.success) {
          setVideos(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoPlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    
    // Pause all videos except the current one
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
      }
    });
    
    // Toggle play/pause for the clicked video
    if (activeIndex === index) {
      video.pause();
      setActiveIndex(null);
    } else {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const headlines = [
    "Math Magic",
    "Science Secrets",
    "Coding Adventures",
    "Art & Creativity",
    "Music Madness",
    "Sports Spectacular",
  ];

  return (
    <section id="videos" className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50 py-20">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-200/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.p variants={cardVariants} className="text-sm uppercase tracking-[0.3em] text-blue-500">
            Fun Learning Experience
          </motion.p>
          <motion.h2 variants={cardVariants} className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
            Tech Guru Moments! <span className="text-2xl sm:text-3xl">📸</span>
          </motion.h2>
          <motion.p variants={cardVariants} className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Boredom&apos;s out! Fun learning is what Techguru is all about!
          </motion.p>
        </motion.div>

        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="shrink-0 w-[200px] aspect-[9/16] rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </motion.div>
        ) : videos.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center py-12">
            <p className="text-slate-600">No videos available yet.</p>
          </motion.div>
        ) : (
          <div className="relative">
            <motion.div
              ref={scrollRef}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((video, index) => (
                <motion.div key={video.id} variants={cardVariants} className="shrink-0 snap-center">
                  <div
                    className="group relative w-[200px] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer shadow-md shadow-blue-100/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/40 hover:scale-[1.02]"
                    onClick={() => handleVideoPlay(index)}
                  >
                    <video 
  ref={(el) => { videoRefs.current[index] = el; }}
  src={video.videoUrl} 
  className="w-full h-full object-cover" 
  muted 
  loop 
  playsInline 
  preload="metadata" 
/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {activeIndex === index ? null : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-white">
                        <h3 className="text-lg font-bold leading-tight">{headlines[index % headlines.length]}</h3>
                        <p className="text-sm text-white/80 mt-1">Watch Now →</p>
                      </div>
                    </div>
                    {activeIndex === index && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(null);
                          }}
                          className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
                        >
                          ×
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {videos.length > 1 && (
                <div className="shrink-0 w-[200px] flex items-center justify-center">
                  <button
                    onClick={() => handleScroll("right")}
                    className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.div>

            {videos.length > 3 && (
              <>
                <button
                  onClick={() => handleScroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="flex justify-center gap-2 mt-6">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    scrollRef.current?.scrollTo({
                      left: index * 216,
                      behavior: "smooth",
                    });
                  }}
                  className="w-2 h-2 rounded-full bg-blue-200 transition-all duration-300 hover:bg-blue-400"
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}