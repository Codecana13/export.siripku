"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const categories = ["All", "Guppy", "Discus", "Betta", "Tetra", "Corydoras", "Facility"];

const galleryItems = [
  { src: "/images/guppy.png", category: "Guppy", title: "Fancy Guppy Collection", desc: "Moscow Blue, Cobra, and Dumbo Ear varieties" },
  { src: "/images/discus.png", category: "Discus", title: "Premium Discus", desc: "Pigeon Blood and Turquoise strains" },
  { src: "/images/betta.png", category: "Betta", title: "Show-Grade Betta", desc: "Halfmoon and Plakat varieties" },
  { src: "/images/tetra.png", category: "Tetra", title: "Neon Tetra School", desc: "Cardinal and Neon Tetras" },
  { src: "/images/corydoras.png", category: "Corydoras", title: "Corydoras Selection", desc: "Panda and Sterbai species" },
  { src: "/images/hero-fish.png", category: "Facility", title: "Export Packing Station", desc: "IATA-standard packing facility" },
  { src: "/images/guppy.png", category: "Guppy", title: "Red Tuxedo Guppy", desc: "High-grade breeding pairs" },
  { src: "/images/discus.png", category: "Discus", title: "Blue Diamond Discus", desc: "Premium 4-inch specimens" },
  { src: "/images/betta.png", category: "Betta", title: "Giant Betta", desc: "Competition-grade giants" },
  { src: "/images/tetra.png", category: "Tetra", title: "Ember Tetra", desc: "Vibrant nano schooling fish" },
  { src: "/images/hero-fish.png", category: "Facility", title: "Quarantine Facility", desc: "Temperature-controlled quarantine room" },
  { src: "/images/corydoras.png", category: "Corydoras", title: "Pygmy Corydoras", desc: "Nano tank specialists" },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 lg:py-32 section-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Visual Showcase
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Our <span className="gradient-text">Fish Gallery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Browse our curated selection of export-quality ornamental fish and state-of-the-art facilities.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-ocean-600 text-white shadow-lg shadow-cyan-500/25"
                  : "glass text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filtered.map((item, i) => (
            <motion.div
              key={`${item.title}-${i}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square"
              onClick={() => setSelectedImage(i)}
            >
              <Image
                src={item.src}
                alt={`${item.title} - ${item.desc}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#083344]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                <p className="text-cyan-300/80 text-xs">{item.desc}</p>
              </div>
              {/* Category badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-cyan-500/80 text-white">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
          >
            <Image
              src={filtered[selectedImage]?.src || ""}
              alt={filtered[selectedImage]?.title || ""}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-xl font-bold">{filtered[selectedImage]?.title}</h3>
              <p className="text-gray-300">{filtered[selectedImage]?.desc}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
