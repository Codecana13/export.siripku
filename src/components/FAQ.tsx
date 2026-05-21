"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "What types of ornamental fish do you export?",
    a: "We export a comprehensive range of freshwater ornamental fish including Guppies (50+ varieties), Discus, Bettas, Tetras, Corydoras, Plecos, and various exotic species such as Arowana, Flowerhorn, and freshwater stingrays. Our catalog features over 500 species and varieties.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQ varies by species. For common species like guppies and tetras, the minimum is typically 500-1000 pieces. For premium species like discus, the minimum can be as low as 50 pieces. We're flexible and can accommodate mixed-species orders. Contact us for a customized quotation.",
  },
  {
    q: "Which countries do you ship to?",
    a: "We ship to over 30 countries worldwide including the USA, Europe (Germany, UK, Netherlands, etc.), Japan, China, Middle East, South America, and Australia. If your country has live fish import regulations in place, we can ship there.",
  },
  {
    q: "How do you ensure fish survive during shipping?",
    a: "We use IATA-standard packaging with pure oxygen-filled bags, insulated styrofoam boxes, and temperature stabilizers (heat/cold packs). Our packing team is highly experienced, and we achieve a 99%+ survival rate. We also offer DOA (Dead on Arrival) guarantees on qualifying shipments.",
  },
  {
    q: "What documents do you provide?",
    a: "We provide all necessary export documentation including CITES permits (for listed species), Phytosanitary certificates, Health certificates, Commercial invoice, Packing list, and Airway bill. All documents are prepared for seamless customs clearance at your destination.",
  },
  {
    q: "What are the payment terms?",
    a: "We accept wire transfer (T/T) with the following terms: 50% deposit upon order confirmation and 50% balance before shipment. For established repeat customers, we can discuss more flexible payment arrangements. All prices are quoted in USD.",
  },
  {
    q: "How long does shipping take?",
    a: "Transit time depends on your destination. Most shipments arrive within 24-72 hours via direct air cargo. We coordinate with major airlines and cargo agents to ensure the fastest possible transit times. You'll receive real-time tracking information.",
  },
  {
    q: "Do you offer quarantine services?",
    a: "Yes. All fish undergo a mandatory 7-14 day quarantine period in our controlled facility before export. During quarantine, fish are health-screened, treated preventively, and conditioned for transport. This ensures only the healthiest specimens are shipped.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32 section-dark overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Common Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="text-white font-semibold pr-4 group-hover:text-cyan-400 transition-colors">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="https://wa.me/6289652456206?text=Hello%20Siripku%20Export%2C%20I%20have%20a%20question%20about%20your%20fish%20export%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Chat with Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
