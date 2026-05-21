"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export default function LocationMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 relative overflow-hidden" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 md:p-10 overflow-hidden relative"
        >
          {/* Subtle gradient background inside the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Visit Our Farm
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Visit our breeding center & showroom in person. Discover our complete collection of premium ornamental fish and get a free aquascape consultation.
              </p>
              
              <div className="pt-4">
                <h3 className="text-xl font-bold text-white mb-6">SiripKu</h3>
                <a 
                  href="https://google.com/maps/search/?api=1&query=-6.385070469518857,106.73967891046117" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#e65100] hover:bg-[#ff6d00] text-white px-8 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
                >
                  <MapPin className="w-5 h-5" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Right Map */}
            <div className="h-[350px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-xl relative">
              <div className="absolute inset-0 bg-ocean-900/20 pointer-events-none z-10 rounded-2xl" />
              <iframe 
                src="https://maps.google.com/maps?q=-6.385070469518857,106.73967891046117&z=15&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-0 filter contrast-[1.1] saturate-[1.2]"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
