import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "TechGuru | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-white`}
      >
        <Navbar />
        {children}
        <Footer />
        <div className="fixed bottom-22 right-6 group">
          <div className="flex items-center gap-2">
            {/* Hover text */}
            <span
              className="
        opacity-0 group-hover:opacity-100
        translate-x-2 group-hover:translate-x-0
        transition-all duration-300
        bg-gray-800 text-white text-sm
        px-3 py-2 rounded-lg shadow
        whitespace-nowrap
        hidden sm:block
      "
            >
              Send us an email
            </span>

            {/* Email button */}
            <Link
              href="mailto:example@email.com"
              target="_blank"
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg inline-flex"
            >
              <FaEnvelope size={28} />
            </Link>
          </div>
        </div>

        <div className="fixed bottom-4 right-6 group">
          <div className="flex items-center gap-2">
            <span
              className="
        opacity-0 group-hover:opacity-100
        translate-x-2 group-hover:translate-x-0
        transition-all duration-300
        bg-gray-800 text-white text-sm
        px-3 py-2 rounded-lg shadow
        whitespace-nowrap
        hidden sm:block
      "
            >
              Chat with us for students
            </span>

            <Link
              href="https://wa.me/9779849447862"
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg inline-flex"
            >
              <FaWhatsapp size={28} />
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
