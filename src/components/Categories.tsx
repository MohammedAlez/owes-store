import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useShop } from "../context/ShopContext";

export default function Categories() {
  const { categories, selectedCategory, setSelectedCategory } = useShop();

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
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
    <section id="categories" className="py-20 px-6 md:px-12 bg-[#1a1a1e] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#c07a43] uppercase mb-3 font-semibold">
            EXPLORER LES COLLECTIONS
          </div>
          <h2 
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-serif"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            NOS CATÉGORIES
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-[#c07a43] to-[#f2c792] mx-auto mt-4"></div>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.slug;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCategorySelect(category.slug)}
                className={`group relative h-72 rounded-2xl overflow-hidden cursor-pointer border ${
                  isSelected 
                    ? "border-[#c07a43] shadow-lg shadow-[#c07a43]/10 scale-[1.02]" 
                    : "border-zinc-800 hover:border-zinc-700"
                } transition-all duration-300`}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 filter contrast-110 saturate-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                </div>

                {/* Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#f2c792] uppercase font-semibold mb-1">
                    OWES BRAND
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-2 group-hover:text-[#f2c792] transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Subtle hover details */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium tracking-wide group-hover:text-white transition-colors overflow-hidden">
                    <span className="transform -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      Voir la collection
                    </span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Category active dot marker */}
                {isSelected && (
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#c07a43] shadow-md shadow-[#c07a43]"></div>
                )}
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
