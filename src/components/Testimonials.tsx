"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Hans Mueller",
    company: "AquaWorld GmbH",
    country: "Germany",
    flag: "🇩🇪",
    text: "Siripku Export consistently delivers exceptional quality. Their discus are the finest we've imported from Indonesia — vibrant colors, healthy specimens, and zero DOA. A reliable partner for our European distribution.",
    rating: 5,
  },
  {
    name: "Takeshi Yamamoto",
    company: "Tokyo Aquatics Co.",
    country: "Japan",
    flag: "🇯🇵",
    text: "We've been importing from Siripku for over 3 years. Their attention to detail in packaging is unmatched. The fish always arrive in perfect condition, and their species variety is outstanding.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    company: "Pacific Reef Imports",
    country: "United States",
    flag: "🇺🇸",
    text: "The team at Siripku is incredibly professional. From the initial inquiry to receiving the shipment, everything was seamless. Their guppy varieties are stunning — our customers love them.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashidi",
    company: "Gulf Aquarium Trading",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    text: "Competitive pricing with premium quality. Siripku's export process is well-organized, and their documentation is always flawless. Highly recommended for serious importers.",
    rating: 5,
  },
  {
    name: "Maria Fernandez",
    company: "Aqua Brasil Imports",
    country: "Brazil",
    flag: "🇧🇷",
    text: "Despite the long distance, every shipment from Siripku arrives with minimal losses. Their professional packing and commitment to quality make them our top supplier from Southeast Asia.",
    rating: 5,
  },
  {
    name: "Li Wei",
    company: "Shanghai Ornamental Fish Co.",
    country: "China",
    flag: "🇨🇳",
    text: "Excellent variety of betta and exotic species. Siripku's team understands the Chinese market requirements perfectly. Fast communication and reliable delivery schedules.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 section-darker overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Client Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Trusted by Importers{" "}
            <span className="gradient-text">Worldwide</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our international partners say.
          </motion.p>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 right-8 text-6xl text-cyan-500/10 font-serif">&ldquo;</div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-ocean-600 flex items-center justify-center text-2xl flex-shrink-0">
                {testimonials[activeIndex].flag}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{testimonials[activeIndex].name}</h4>
                <p className="text-cyan-400 text-sm">{testimonials[activeIndex].company}</p>
                <p className="text-gray-500 text-xs">{testimonials[activeIndex].country}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
              </div>
            </div>
            
            <blockquote className="text-gray-300 text-lg leading-relaxed italic">
              &ldquo;{testimonials[activeIndex].text}&rdquo;
            </blockquote>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "bg-cyan-400 w-8"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              onClick={() => setActiveIndex(i)}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                activeIndex === i
                  ? "border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                  : "hover:border-cyan-500/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{t.flag}</span>
                <div>
                  <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                  <p className="text-gray-500 text-xs">{t.company} • {t.country}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
