"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Collection", href: "/#collection" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Process", href: "/#process" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "FAQ", href: "/#faq" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "nav-blur shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="Siripku Export Logo" width={40} height={40} className="object-contain" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Siripku<span className="text-cyan-400">Export</span>
                </span>
                <p className="text-[10px] text-cyan-300/60 tracking-[0.2em] uppercase -mt-0.5">
                  Indonesia
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-300 rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#inquiry"
                className="ml-4 btn-primary !py-2.5 !px-6 !text-sm !rounded-lg"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0f172a] border-l border-cyan-500/10 p-8 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all text-lg"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/#inquiry"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-4 btn-primary text-center justify-center"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
