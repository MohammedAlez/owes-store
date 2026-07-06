import React, { useState, useMemo } from "react";
import { Filter, Eye, HelpCircle, ArrowRight, ShoppingCart } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { Product } from "../types";
import ProductDetailModal from "./ProductDetailModal";
import { motion } from "motion/react";

export default function Products() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    selectedProduct, 
    setSelectedProduct, 
    addToCart 
  } = useShop();

  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  // Filtering & Sorting Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === selectedCategory || (selectedCategory === "new-arrivals" && p.isNew)
      );
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const activeCategoryName = useMemo(() => {
    if (selectedCategory === "all") return "Tous les articles";
    if (selectedCategory === "new-arrivals") return "Nouveautés";
    if (selectedCategory === "hoodies-sweats") return "Sweats & Hoodies";
    if (selectedCategory === "tshirts-tops") return "T-Shirts & Tops";
    if (selectedCategory === "pants-cargo") return "Pantalons & Cargo";
    if (selectedCategory === "accessories-caps") return "Accessoires & Casquettes";
    return selectedCategory;
  }, [selectedCategory]);

  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-[#1a1a1e] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-zinc-900 gap-6">
          <div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#c07a43] uppercase mb-2 font-semibold">
              NOTRE COLLECTION
            </div>
            <h2 
              className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-serif"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {activeCategoryName}
            </h2>
            <p className="text-zinc-500 text-xs mt-2 font-sans font-light">
              Affichage de {filteredAndSortedProducts.length} articles soigneusement sélectionnés
            </p>
          </div>

          {/* Controls: Sorting / Reset */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto font-sans">
            {/* Search warning filter indication */}
            {searchQuery && (
              <div className="bg-[#c07a43]/15 border border-[#c07a43]/30 px-3 py-1.5 rounded-xl text-xs text-[#f2c792] flex items-center gap-1.5">
                Recherche: "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20 bg-zinc-950/30 border border-zinc-900 rounded-3xl font-sans">
            <HelpCircle className="h-12 w-12 text-[#c07a43] mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Aucun produit trouvé</h3>
            <p className="text-zinc-500 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
              Nous n'avons pas trouvé de produits correspondant à votre recherche. Essayez de réinitialiser vos filtres.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="mt-6 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs text-[#f2c792] font-semibold uppercase tracking-wider transition-colors"
            >
              Réinitialiser les Filtres
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 sm:gap-y-12 sm:gap-x-8">
          {filteredAndSortedProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx % 3 * 0.1 }}
              className="group flex flex-col font-sans"
            >
              {/* Product Image Frame */}
              <div 
                onClick={() => setSelectedProduct(product)}
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 group-hover:border-[#c07a43]/40 cursor-pointer transition-all duration-500"
              >

                {/* Main Product Image (hover transition to second image) */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-out"
                />
                <img
                  src={product.images[1] || product.images[0]}
                  alt={`${product.name} View 2`}
                  className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Dynamic Quick View Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="h-11 w-11 rounded-full bg-white text-black hover:bg-[#f2c792] hover:scale-110 active:scale-95 flex items-center justify-center transition-all shadow-lg"
                    title="Aperçu rapide"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Auto add default first size and color
                      addToCart(product, 1, product.sizes[0], product.colors[0]);
                    }}
                    className="h-11 w-11 rounded-full bg-[#c07a43] text-white hover:bg-[#a6622d] hover:scale-110 active:scale-95 flex items-center justify-center transition-all shadow-lg"
                    title="Ajouter au panier rapide"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="mt-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                      {product.category.replace("-", " ")}
                    </span>
                    <div className="flex gap-1">
                      {product.colors.map((c) => (
                        <span
                          key={c.hex}
                          className="h-2 w-2 rounded-full border border-white/20 block"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        ></span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm font-bold text-white uppercase tracking-wider mt-1 group-hover:text-[#f2c792] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                </div>

                {/* Price Tag & Details button */}
                <div className="flex justify-between items-baseline mt-2.5 pt-2.5 border-t border-zinc-900/60">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-extrabold text-[#f2c792] tracking-wide">
                      {product.price.toLocaleString()} DA
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] line-through text-zinc-600">
                        {product.originalPrice.toLocaleString()} DA
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 group-hover:text-[#c07a43] transition-colors flex items-center gap-1 focus:outline-none"
                  >
                    Détails <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                </div>

                {/* Visible Commander Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="mt-3 w-full flex items-center justify-center gap-1 sm:gap-2 bg-zinc-950 border border-zinc-900 hover:border-transparent hover:bg-[#c07a43] text-[#f2c792] hover:text-white py-2 sm:py-3 px-1 sm:px-4 rounded-xl text-[9px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>Commander</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal Renderer */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
