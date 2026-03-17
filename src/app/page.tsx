"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import MainSection from "./components/MainSection";
import HeroSection2 from "./components/HeroSection";
import BottomSection from "./components/BottomSection";
import Team from "./components/Team";
import Faqs from "./components/Faqs";
import Marquee from "./components/Marquee";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const scrollToSection = () => {
        const element = document.querySelector(hash);
        if (element) {
          const navbarHeight = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      const timer = setTimeout(scrollToSection, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection2 />
        </motion.div>

        <Marquee text="A leading tech institution in Nepal guiding students to global success" />

        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-1 bg-linear-to-r from-blue-400 via-blue-500 to-[#FFFFFF]"
        /> */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <MainSection />
        </motion.div>

        <Team />
        <BottomSection />
        <Faqs />
      </div>
    </>
  );
}
