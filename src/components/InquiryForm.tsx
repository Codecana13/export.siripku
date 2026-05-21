"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const fishOptions = [
  "Guppy",
  "Discus",
  "Betta",
  "Tetra",
  "Corydoras",
  "Pleco",
  "Arowana",
  "Flowerhorn",
  "Other / Mixed Species",
];

export default function InquiryForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const country = formData.get("country") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const fish = formData.get("fish") as string;
    const quantity = formData.get("quantity") as string;
    const message = formData.get("message") as string;

    // Build WhatsApp message
    const waMessage = `Hello Siripku Export,%0AI am interested in importing ornamental fish.%0A%0AName: ${encodeURIComponent(name)}%0ACompany: ${encodeURIComponent(company)}%0ACountry: ${encodeURIComponent(country)}%0AWhatsApp: ${encodeURIComponent(whatsapp)}%0AEmail: ${encodeURIComponent(email)}%0AFish Type: ${encodeURIComponent(fish)}%0AEstimated Quantity: ${encodeURIComponent(quantity)}%0AMessage: ${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(`https://wa.me/6289652456206?text=${waMessage}`, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="inquiry" className="relative py-24 lg:py-32 section-darker overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to <span className="gradient-text">Import?</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Submit your inquiry and our export team will respond within 2 hours with 
              pricing, availability, and shipping details tailored to your market.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                "No minimum commitment — start with a trial order",
                "Custom species selection for your market",
                "Competitive wholesale pricing with volume discounts",
                "Complete export documentation included",
                "DOA guarantee on qualifying shipments",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold mb-2">Direct Contact</h3>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-cyan-400">📧</span>
                <span>export.siripku@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-cyan-400">📱</span>
                <span>+62 896 5245 6206 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-cyan-400">🌐</span>
                <span>export.siripku.id</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-cyan-400">📍</span>
                <a href="https://google.com/maps/search/?api=1&query=-6.385070469518857,106.73967891046117" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Location Map</a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Inquiry Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for your interest. Our export team will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Export Inquiry Form</h3>
                  <p className="text-sm text-gray-400 mb-6">Fill in the details below and we&apos;ll prepare a quotation for you.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-sm text-gray-300 mb-1.5 font-medium">Full Name *</label>
                      <input
                        type="text"
                        id="inquiry-name"
                        name="name"
                        required
                        className="form-input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-company" className="block text-sm text-gray-300 mb-1.5 font-medium">Company *</label>
                      <input
                        type="text"
                        id="inquiry-company"
                        name="company"
                        required
                        className="form-input"
                        placeholder="Aqua Imports LLC"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-country" className="block text-sm text-gray-300 mb-1.5 font-medium">Country *</label>
                      <input
                        type="text"
                        id="inquiry-country"
                        name="country"
                        required
                        className="form-input"
                        placeholder="United States"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-whatsapp" className="block text-sm text-gray-300 mb-1.5 font-medium">WhatsApp Number *</label>
                      <input
                        type="tel"
                        id="inquiry-whatsapp"
                        name="whatsapp"
                        required
                        className="form-input"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-sm text-gray-300 mb-1.5 font-medium">Email Address *</label>
                    <input
                      type="email"
                      id="inquiry-email"
                      name="email"
                      required
                      className="form-input"
                      placeholder="john@aquaimports.com"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-fish" className="block text-sm text-gray-300 mb-1.5 font-medium">Fish Interest *</label>
                      <select
                        id="inquiry-fish"
                        name="fish"
                        required
                        className="form-input appearance-none cursor-pointer"
                      >
                        <option value="">Select fish type</option>
                        {fishOptions.map((fish) => (
                          <option key={fish} value={fish} className="bg-[#0f172a]">
                            {fish}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="inquiry-quantity" className="block text-sm text-gray-300 mb-1.5 font-medium">Est. Quantity</label>
                      <input
                        type="text"
                        id="inquiry-quantity"
                        name="quantity"
                        className="form-input"
                        placeholder="e.g. 1000 pcs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-message" className="block text-sm text-gray-300 mb-1.5 font-medium">Message</label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Tell us about your requirements, preferred species, sizes, etc."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center text-lg !py-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry via WhatsApp
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you&apos;ll be redirected to WhatsApp with a pre-filled message for faster response.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
