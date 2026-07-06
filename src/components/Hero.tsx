import React from "react";
import { ArrowDown, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useShop } from "../context/ShopContext";

export default function Hero() {
  const { setSelectedCategory } = useShop();

  const handleScrollToShop = () => {
    setSelectedCategory("all");
    const element = document.getElementById("products");
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center bg-[#141416] overflow-hidden"
    >
      {/* Premium Unsplash Editorial Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1600"
          alt="Owes Store Editorial Background"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter grayscale contrast-125 saturate-50"
        />
        {/* Dark radial and linear gradients for luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1e] via-transparent to-[#1a1a1e]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1e]/80 via-transparent to-[#1a1a1e]/80"></div>
      </div>

      {/* Decorative vertical lines representing structural editorial look */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-white/5 hidden md:block"></div>
      <div className="absolute inset-y-0 right-12 w-[1px] bg-white/5 hidden md:block"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Huge Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6 font-serif"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          DESIGNED WITH <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f2c792] via-[#c07a43] to-[#f2c792] bg-size-200">
            INTENTION
          </span>
        </motion.h1>

        {/* Description subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-[#a1a1aa] max-w-2xl font-light tracking-wide leading-relaxed mb-10 font-sans"
        >
          Importateur direct de pièces originales haut de gamme des USA. Des silhouettes intemporelles, des matières nobles et une coupe irréprochable pour l'Algérie. Disponible à notre magasin à <strong>Akid Lotfi, Oran</strong> et en livraison sécurisée sur les <strong>58 wilayas</strong>.
        </motion.p>

        {/* Call to Actions buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Main CTA */}
          <button
            onClick={handleScrollToShop}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#c07a43] hover:bg-[#a6622d] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            Découvrir la boutique
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              const el = document.getElementById("testimonials");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-[#c07a43]/50 text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition-all cursor-pointer"
          >
            Avis clients
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={handleScrollToShop}
      >
        <span className="text-[9px] font-mono tracking-widest text-[#a1a1aa] uppercase">Défiler</span>
        <ArrowDown className="h-4 w-4 text-[#f2c792]" />
      </motion.div>
    </section>
  );
}
