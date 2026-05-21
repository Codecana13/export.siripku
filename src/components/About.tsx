"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Export Quality Assurance",
    desc: "Every fish undergoes rigorous health screening and quarantine protocols before shipment.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Worldwide Shipping",
    desc: "Direct air freight to 30+ countries with temperature-controlled packaging.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Sustainable Practices",
    desc: "Responsible breeding and collection with environmental stewardship at our core.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Years of Expertise",
    desc: "Decades of combined experience in ornamental fish breeding, handling, and international export.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32 section-dark overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            About Siripku Export
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Indonesia&apos;s Trusted{" "}
            <span className="gradient-text">Ornamental Fish</span> Exporter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Based in the heart of Indonesia — the world&apos;s largest archipelago and one of the 
            most biodiverse regions on Earth — Siripku Export specializes in sourcing, breeding, 
            and delivering premium freshwater ornamental fish to international markets.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                A 3rd Generation Family Heritage
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Siripku Export is a 3rd-generation family business born from the deep-rooted collaboration of dedicated breeders and fish farmers in our local village. Together, we share a unified vision: to nurture, develop, and showcase our premium local ornamental fish to the global export market.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                By empowering our local farming community and combining decades of generational expertise with modern aquaculture practices, we ensure that every fish we export meets the highest international standards of health, quality, and sustainability.
              </p>
              <div className="flex flex-wrap gap-3">
                {["CITES Compliant", "Health Certified", "IATA Packaging", "DOA Guarantee"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Highlights */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-ocean-600/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-8 lg:p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🌏", value: "30+", label: "Export Destinations" },
              { icon: "🐟", value: "500+", label: "Species Catalog" },
              { icon: "📦", value: "10,000+", label: "Monthly Fish Shipped" },
              { icon: "⭐", value: "99%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
