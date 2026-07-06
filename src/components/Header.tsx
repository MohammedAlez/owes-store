import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";
import Logo from "./Logo";

export default function Header() {
  const { cartCount, setIsCartOpen, setSelectedCategory, setSearchQuery } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
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
    <header id="owes-header" className="relative z-40 w-full transition-all duration-300">
      {/* Main Navbar */}
      <div
        id="main-nav"
        className={`w-full py-4 px-6 md:px-12 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-[#121212]/95 backdrop-blur-md border-[#c07a43]/20 shadow-lg"
            : "bg-[#121212]/80 backdrop-blur-xs border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Menu Trigger (Mobile) & Navigation Links (Desktop) */}
          <div className="flex items-center gap-6">
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-[#f2c792] hover:text-[#c07a43] transition-colors p-1"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            <nav id="desktop-nav" className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  scrollToSection("hero");
                }}
                className="text-white hover:text-[#f2c792] transition-colors relative group py-2"
              >
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c07a43] transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("new-arrivals");
                  scrollToSection("products");
                }}
                className="text-white hover:text-[#f2c792] transition-colors relative group py-2"
              >
                Nouveautés
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c07a43] transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  scrollToSection("products");
                }}
                className="text-white hover:text-[#f2c792] transition-colors relative group py-2"
              >
                Boutique
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c07a43] transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-white hover:text-[#f2c792] transition-colors relative group py-2"
              >
                Avis Clients
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c07a43] transition-all group-hover:w-full"></span>
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <button 
              onClick={() => {
                setSelectedCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }} 
              className="focus:outline-none focus:ring-2 focus:ring-[#c07a43]/50 rounded-lg"
            >
              <Logo size="md" showSubtext={false} />
            </button>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-4">
            {/* Telephone shortcut */}
            <a 
              href="tel:0698070162" 
              className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-zinc-900 text-[#f2c792] border border-zinc-800 hover:border-[#c07a43] hover:text-[#c07a43] transition-colors"
              title="Appelez-nous"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Shopping Cart button */}
            <button
              id="cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative h-10 w-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:border-[#c07a43] transition-all"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="h-5 w-5 text-[#f2c792]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c07a43] text-[10px] font-bold text-white shadow-md animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer-overlay" className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop blur overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          ></div>

          {/* Drawer content */}
          <div
            id="mobile-drawer-content"
            className="relative w-full max-w-sm bg-[#121212] border-r border-[#c07a43]/20 flex flex-col justify-between p-8 shadow-2xl animate-slideInRight"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-8 border-b border-zinc-800">
                <Logo size="sm" showSubtext={false} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#f2c792] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation links list */}
              <nav className="mt-8 flex flex-col gap-6">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    scrollToSection("hero");
                  }}
                  className="text-left text-lg font-medium text-white hover:text-[#f2c792] uppercase tracking-wider py-1 border-b border-transparent hover:border-[#c07a43]/50 transition-all"
                >
                  Accueil
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("new-arrivals");
                    scrollToSection("products");
                  }}
                  className="text-left text-lg font-medium text-white hover:text-[#f2c792] uppercase tracking-wider py-1 border-b border-transparent hover:border-[#c07a43]/50 transition-all"
                >
                  Nouveautés
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    scrollToSection("products");
                  }}
                  className="text-left text-lg font-medium text-white hover:text-[#f2c792] uppercase tracking-wider py-1 border-b border-transparent hover:border-[#c07a43]/50 transition-all"
                >
                  Boutique
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-left text-lg font-medium text-white hover:text-[#f2c792] uppercase tracking-wider py-1 border-b border-transparent hover:border-[#c07a43]/50 transition-all"
                >
                  Avis Clients
                </button>
                <button
                  onClick={() => scrollToSection("footer")}
                  className="text-left text-lg font-medium text-white hover:text-[#f2c792] uppercase tracking-wider py-1 border-b border-transparent hover:border-[#c07a43]/50 transition-all"
                >
                  Boutique Adresse
                </button>
              </nav>
            </div>

            {/* Footer inside mobile drawer */}
            <div className="border-t border-zinc-800 pt-6 flex flex-col gap-4 font-sans">
              <div className="flex items-center gap-3 text-zinc-400">
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#f2c792]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Appelez-nous</div>
                  <a href="tel:0698070162" className="text-sm font-semibold text-white hover:text-[#c07a43]">06-98-07-01-62</a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#c07a43]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Boutique</div>
                  <span className="text-xs text-white">Akid Lotfi, Oran, Algérie</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://instagram.com/owes_store" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8a3ab9] via-[#e95950] to-[#fccc63] text-white py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  <span className="font-bold">Instagram</span>
                </a>
                <a 
                  href="https://wa.me/213698070162" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
