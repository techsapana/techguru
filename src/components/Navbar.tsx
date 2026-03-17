"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Blogs", href: "/blogs" },
  { name: "Our Team", href: "#team" },
  { name: "Contact", href: "/contact" },
  { name: "Partners", href: "#partners" },
  { name: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleHashClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (pathname !== "/") {
      event.preventDefault();
      router.push(`/${hash}`);
      setOpen(false);
      return;
    }

    const target = document.querySelector(hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", hash);
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600 ml-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/techguru.png"
              alt="TechGuru Logo"
              width={60}
              height={60}
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 mr-8">
          {navItems.map((item) => {
            const isHash = item.href.startsWith("#");

            return (
              <motion.div
                key={item.name}
                whileHover="hover"
                className="relative"
              >
                <Link
                  href={item.href}
                  onClick={(event) =>
                    isHash ? handleHashClick(event, item.href) : setOpen(false)
                  }
                  className="text-gray-700 font-semibold tracking-tight hover:text-indigo-600 transition-colors duration-200"
                >
                  {item.name}
                </Link>

                <motion.span
                  variants={{
                    hover: { width: "100%" },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-600"
                />
              </motion.div>
            );
          })}

          <Link href="/enroll" className="ml-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block enroll-ripple-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-6 py-2.5 rounded-lg shadow-lg text-center"
            >
              Enroll Now
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Button and Enroll */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/enroll">
            <motion.div
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="inline-block enroll-ripple-btn bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-lg text-center"
            >
              Enroll Now
            </motion.div>
          </Link>

          <button onClick={() => setOpen(!open)} className="text-gray-700">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => {
              const isHash = item.href.startsWith("#");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(event) =>
                    isHash ? handleHashClick(event, item.href) : setOpen(false)
                  }
                  className="text-gray-700 font-medium"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
