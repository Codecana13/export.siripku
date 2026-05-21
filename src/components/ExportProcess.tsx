"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Inquiry & Consultation",
    description: "Submit your inquiry via our form or WhatsApp. Our export team will discuss your requirements, species availability, pricing, and shipping options.",
    icon: "💬",
    detail: "Response within 2 hours",
  },
  {
    step: "02",
    title: "Species Selection & Quotation",
    description: "Browse our catalog, select species and quantities. Receive a detailed quotation including fish pricing, packaging, and freight estimates.",
    icon: "📋",
    detail: "Customized pricing sheet",
  },
  {
    step: "03",
    title: "Order Confirmation & Payment",
    description: "Confirm your order and process payment via wire transfer. We prepare all export documents, CITES permits, and health certificates.",
    icon: "✅",
    detail: "Secure bank transfer",
  },
  {
    step: "04",
    title: "Fish Selection & Quarantine",
    description: "Our team hand-selects the finest specimens from our farms. Fish undergo a quarantine period with health monitoring and conditioning.",
    icon: "🔬",
    detail: "7-14 day quarantine",
  },
  {
    step: "05",
    title: "Professional Packing",
    description: "Fish are packed in IATA-compliant oxygen-filled bags with temperature stabilizers. Each box is labeled and documented for customs clearance.",
    icon: "📦",
    detail: "IATA standard packaging",
  },
  {
    step: "06",
    title: "Air Freight & Delivery",
    description: "Shipment is dispatched via direct air cargo to your nearest international airport. Real-time tracking provided until arrival.",
    icon: "✈️",
    detail: "24-72hr delivery worldwide",
  },
];

export default function ExportProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-24 lg:py-32 section-darker overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Seamless <span className="gradient-text">Export Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            From inquiry to delivery, our streamlined 6-step process ensures a smooth 
            and transparent trading experience.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line (desktop) */}
          <div className="hidden md:block timeline-line" />

          {/* Mobile Line */}
          <div className="md:hidden absolute left-[20px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Mobile dot */}
                  <div className="md:hidden relative z-10 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-ocean-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-cyan-500/30">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-[calc(50%-40px)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="glass-card rounded-2xl p-6 lg:p-8 card-hover group">
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? "md:justify-end" : ""}`}>
                        <span className="text-3xl">{step.icon}</span>
                        <div>
                          <span className="text-cyan-400 text-sm font-semibold">Step {step.step}</span>
                          <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-400 leading-relaxed mb-3">{step.description}</p>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {step.detail}
                      </span>
                    </div>
                  </div>

                  {/* Center Node (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-ocean-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 border-4 border-[#0b1120]">
                      {step.step}
                    </div>
                  </div>

                  {/* Empty spacer */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
