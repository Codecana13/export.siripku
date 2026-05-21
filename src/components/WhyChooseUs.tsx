"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Healthy & Vibrant Fish",
    description: "Rigorous quarantine and health screening protocols ensure only the healthiest, most vibrant specimens are selected for export.",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Competitive Pricing",
    description: "Direct sourcing from Indonesian fish farms eliminates middlemen, giving you the best wholesale pricing in the market.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    title: "Export Quality Control",
    description: "Multi-stage quality inspection from selection to packing. CITES-compliant documentation and health certificates included.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Worldwide Shipping",
    description: "Door-to-airport delivery via major air cargo partners. Temperature-controlled logistics to 30+ countries across all continents.",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Secure Packaging",
    description: "IATA-standard packaging with oxygen-filled bags, insulated styrofoam boxes, and heat/cold packs for maximum survival rates.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    title: "Responsive Support",
    description: "Dedicated export team available via WhatsApp, email, and video call. Real-time order tracking and after-sales support.",
    gradient: "from-rose-500/20 to-red-500/20",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="relative py-24 lg:py-32 section-dark overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Our Advantages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Why Leading Importers{" "}
            <span className="gradient-text">Choose Siripku</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            We combine Indonesia&apos;s unparalleled biodiversity with world-class export 
            operations to deliver an exceptional trading experience.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="glass-card rounded-2xl p-8 card-hover group relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-ocean-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Ready to experience the Siripku difference?</p>
          <a href="#inquiry" className="btn-primary">
            Start Your First Order
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
