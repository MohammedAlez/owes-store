import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, User } from "lucide-react";
import { TESTIMONIALS } from "../data";
import { motion } from "motion/react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 bg-zinc-950 relative border-t border-zinc-900">
      {/* Decorative quotes graphic inside background */}
      <div className="absolute right-12 bottom-12 opacity-5 pointer-events-none hidden md:block">
        <Quote className="h-44 w-44 text-white" />
      </div>

      <div className="max-w-4xl mx-auto text-center font-sans">
        {/* Header */}
        <div className="mb-16">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#c07a43] uppercase mb-3 font-semibold">
            LA SATISFACTION DE NOS CLIENTS
          </div>
          <h2 
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-serif"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            AVIS DE NOS CLIENTS
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-[#c07a43] to-[#f2c792] mx-auto mt-4"></div>
        </div>

        {/* Carousel Slide */}
        <div className="relative bg-zinc-900/40 border border-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden min-h-[300px] flex flex-col justify-between">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#f2c792] text-[#f2c792]" />
              ))}
            </div>

            {/* Quote Text */}
            <p className="text-sm md:text-base text-zinc-300 font-light italic leading-relaxed max-w-2xl mb-8">
              "{TESTIMONIALS[activeIndex].text}"
            </p>

            {/* Profile */}
            <div className="text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {TESTIMONIALS[activeIndex].name}
              </h4>
            </div>
          </motion.div>

          {/* Carousel Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-900 hover:border-[#c07a43] text-[#f2c792] hover:text-white transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-900 hover:border-[#c07a43] text-[#f2c792] hover:text-white transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dynamic statistics section */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto border-t border-zinc-900 pt-10">
          <div>
            <div className="text-3xl font-black text-white">45K+</div>
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Abonnés Instagram</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#f2c792]">58</div>
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Wilayas Desservies</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">2.8K+</div>
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Modèles Publiés</div>
          </div>
        </div>
      </div>
    </section>
  );
}
