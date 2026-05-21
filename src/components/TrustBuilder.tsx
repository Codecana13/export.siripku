"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const exportCountries = [
  { region: "Asia Pacific", countries: ["Japan", "China", "South Korea", "Singapore", "Thailand", "Malaysia", "Australia"], flag: "🌏" },
  { region: "Europe", countries: ["Germany", "Netherlands", "UK", "France", "Italy", "Spain", "Poland"], flag: "🌍" },
  { region: "Americas", countries: ["United States", "Canada", "Brazil", "Mexico", "Colombia", "Chile"], flag: "🌎" },
  { region: "Middle East & Africa", countries: ["UAE", "Saudi Arabia", "Qatar", "Kuwait", "South Africa", "Egypt"], flag: "🌍" },
];

const trustFeatures = [
  {
    icon: "📸",
    title: "Fish Farm Facilities",
    description: "State-of-the-art breeding and grow-out ponds across Indonesian tropical regions. Climate-controlled indoor facilities for premium species.",
  },
  {
    icon: "📦",
    title: "Export Packaging",
    description: "IATA-compliant double-bagged oxygen packaging in insulated styrofoam boxes. Heat packs for cold destinations, cold packs for tropical routes.",
  },
  {
    icon: "✈️",
    title: "Air Cargo Process",
    description: "Direct partnerships with major airlines for priority live cargo handling. Temperature-monitored from packing station to your airport.",
  },
  {
    icon: "🏆",
    title: "Quality Certifications",
    description: "CITES compliance, health certificates, phytosanitary documentation. Full traceability from farm to destination.",
  },
];

export default function TrustBuilder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 section-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Global Reach
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Exporting to <span className="gradient-text">30+ Countries</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            From Southeast Asia to the Americas, our ornamental fish reach aquarium businesses 
            on every continent. Trusted by importers across the globe.
          </motion.p>
        </div>

        {/* Export Regions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {exportCountries.map((region, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover"
            >
              <div className="text-4xl mb-3">{region.flag}</div>
              <h3 className="text-white font-bold text-lg mb-3">{region.region}</h3>
              <div className="flex flex-wrap gap-1.5">
                {region.countries.map((country) => (
                  <span
                    key={country}
                    className="px-2 py-0.5 rounded text-xs text-gray-400 bg-white/5"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            Behind the Scenes of Our Export Operations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center card-hover group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-3xl overflow-hidden relative"
        >
          <div className="gradient-ocean p-10 lg:p-14 text-center relative">
            <div className="absolute inset-0 bg-[url('/images/hero-fish.png')] bg-cover bg-center opacity-10" />
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Years of Trusted Export Experience
              </h3>
              <p className="text-cyan-100/80 text-lg mb-8 max-w-2xl mx-auto">
                With a deep understanding of international fish trade regulations and buyer 
                expectations, Siripku Export has built a reputation for reliability, quality, 
                and professionalism.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  { value: "99%", label: "Survival Rate" },
                  { value: "24/7", label: "Support" },
                  { value: "500+", label: "Species" },
                  { value: "30+", label: "Countries" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-cyan-200/70">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a href="#inquiry" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-ocean-800 font-bold text-lg hover:bg-cyan-50 transition-colors shadow-xl">
                Start Your First Order
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
