"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

function Bubble({ delay, size, left }: { delay: number; size: number; left: string }) {
  return (
    <div
      className="bubble"
      style={{
        width: size,
        height: size,
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${8 + Math.random() * 12}s`,
      }}
    />
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bubbles = mounted
    ? Array.from({ length: 15 }, (_, i) => ({
        delay: Math.random() * 10,
        size: 4 + Math.random() * 30,
        left: `${Math.random() * 100}%`,
      }))
    : [];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-fish.png"
          alt="Premium freshwater ornamental fish from Indonesia - Siripku Export"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1120]/95 via-[#0b1120]/70 to-[#083344]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-[#0b1120]/30" />
      </div>

      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {bubbles.map((b, i) => (
          <Bubble key={i} {...b} />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl animate-float pointer-events-none z-[1]" />
      <div className="absolute bottom-32 left-10 w-48 h-48 rounded-full bg-ocean-500/10 blur-3xl animate-float-slow pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-cyan-300 font-medium">
              Trusted Exporter Since Indonesia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-white">Premium </span>
            <span className="gradient-text">Freshwater</span>
            <br />
            <span className="text-white">Ornamental Fish</span>
            <br />
            <span className="text-cyan-300/80 text-3xl sm:text-4xl lg:text-5xl font-medium">
              from Indonesia to the World
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300/90 mb-10 max-w-2xl leading-relaxed"
          >
            Siripku Export delivers export-grade tropical aquarium fish to importers, 
            wholesalers, and distributors worldwide. Exceptional quality. 
            Reliable supply. Competitive pricing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#inquiry" className="btn-primary text-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Request Catalog
            </a>
            <a
              href="https://wa.me/6289652456206?text=Hello%20Siripku%20Export%2C%0AI%20am%20interested%20in%20importing%20ornamental%20fish.%0A%0ACountry%3A%0AFish%20Type%3A%0AEstimated%20Quantity%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact Export Team
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-8 items-center"
          >
            {[
              { value: "30+", label: "Countries Served" },
              { value: "500+", label: "Species Available" },
              { value: "10K+", label: "Monthly Exports" },
              { value: "99%", label: "Survival Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z"
            fill="#0b1120"
          />
        </svg>
      </div>
    </section>
  );
}
