"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const fishCategories = [
  {
    name: "Guppy",
    scientific: "Poecilia reticulata",
    image: "/images/guppy.png",
    description: "Premium fancy guppies with vibrant tail patterns. Available in 50+ color varieties including Moscow, Cobra, Dumbo Ear, and Tuxedo strains.",
    varieties: "50+ varieties",
    minOrder: "500 pairs",
    tag: "Best Seller",
  },
  {
    name: "Discus",
    scientific: "Symphysodon spp.",
    image: "/images/discus.png",
    description: "The King of Aquarium Fish. Hand-selected discus with vivid coloration — Pigeon Blood, Turquoise, Red Melon, and Blue Diamond strains.",
    varieties: "30+ strains",
    minOrder: "50 pcs",
    tag: "Premium",
  },
  {
    name: "Betta",
    scientific: "Betta splendens",
    image: "/images/betta.png",
    description: "Show-quality Siamese fighting fish. Halfmoon, Plakat, Crown Tail, and Giant varieties in stunning color combinations.",
    varieties: "100+ varieties",
    minOrder: "200 pcs",
    tag: "Popular",
  },
  {
    name: "Tetra",
    scientific: "Various species",
    image: "/images/tetra.png",
    description: "Schooling beauties for planted aquariums. Neon Tetra, Cardinal Tetra, Rummy Nose, and Ember Tetras bred for vibrant coloration.",
    varieties: "25+ species",
    minOrder: "1000 pcs",
    tag: "High Volume",
  },
  {
    name: "Corydoras",
    scientific: "Corydoras spp.",
    image: "/images/corydoras.png",
    description: "Peaceful bottom-dwelling catfish loved by aquarists worldwide. Panda, Pygmy, Sterbai, and Albino varieties.",
    varieties: "20+ species",
    minOrder: "500 pcs",
    tag: "Trending",
  },
  {
    name: "Pleco",
    scientific: "Hypostomus plecostomus",
    image: "/images/guppy.png",
    description: "Algae-eating specialists and exotic L-number plecos. Bristlenose, Royal, and rare species for collectors and retailers.",
    varieties: "15+ species",
    minOrder: "100 pcs",
    tag: "Collector",
  },
  {
    name: "Exotic Species",
    scientific: "Rare & Premium",
    image: "/images/discus.png",
    description: "Rare and exotic freshwater species including Arowana, Flowerhorn, Axolotl, freshwater stingrays, and more for premium markets.",
    varieties: "40+ species",
    minOrder: "On request",
    tag: "Exclusive",
  },
];

export default function FishCollection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="collection" className="relative py-24 lg:py-32 section-darker overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-40 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
          >
            Our Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Featured <span className="gradient-text">Fish Categories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Explore our extensive catalog of export-grade freshwater ornamental fish. 
            Each species is carefully bred and selected to meet international quality standards.
          </motion.p>
        </div>

        {/* Fish Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fishCategories.map((fish, i) => (
            <motion.div
              key={fish.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="fish-card group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={fish.image}
                  alt={`${fish.name} - ${fish.scientific} - Export quality ornamental fish from Indonesia`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/90 text-white backdrop-blur-sm">
                    {fish.tag}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-xl font-bold text-white mb-1">{fish.name}</h3>
                  <p className="text-cyan-300/80 text-sm italic mb-3">{fish.scientific}</p>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: hoveredIndex === i ? "auto" : 0,
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {fish.description}
                    </p>
                    <div className="flex justify-between text-xs text-gray-400 mb-3">
                      <span>📋 {fish.varieties}</span>
                      <span>📦 Min: {fish.minOrder}</span>
                    </div>
                    <a
                      href="#inquiry"
                      className="block w-full text-center py-2.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
                    >
                      Request Quote →
                    </a>
                  </motion.div>
                </div>
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
          <a href="#inquiry" className="btn-primary">
            Request Full Species Catalog
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
