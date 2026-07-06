import React, { useState } from "react";
import { MapPin, Phone, Instagram, Clock, Mail, CheckCircle, ArrowRight, ShieldAlert, Heart, HelpCircle, MessageSquare } from "lucide-react";
import Logo from "./Logo";
import { useShop } from "../context/ShopContext";

export default function Footer() {
  const { setSelectedCategory } = useShop();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
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
    <footer id="footer" className="bg-[#09090b] border-t border-zinc-900 pt-20 pb-8 px-6 md:px-12 relative overflow-hidden font-sans">
      
      {/* Decorative Brand Text Backdrop (Toteme style large logo at bottom) */}
      <div className="absolute inset-x-0 bottom-0 select-none opacity-[0.02] text-center pointer-events-none hidden lg:block">
        <h2 className="text-[14rem] font-serif font-black tracking-widest text-white leading-none">OWES</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Segment: Brand and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Logo & Bio Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo size="lg" className="!items-start" />
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Magasin de vêtements original importé des USA à Oran. Notre mission est de vous proposer des pièces authentiques, de qualité supérieure, avec un service de livraison rapide sur les 58 wilayas d'Algérie.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/owes_store" 
                target="_blank" 
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-[#c07a43]/15 border border-zinc-800 hover:border-[#c07a43] flex items-center justify-center text-[#f2c792] transition-all"
                title="Suivez-nous sur Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://wa.me/213698070162" 
                target="_blank" 
                rel="noreferrer"
                className="h-10 w-10 rounded-full bg-zinc-900 hover:bg-emerald-600/15 border border-zinc-800 hover:border-emerald-500 flex items-center justify-center text-emerald-400 transition-all"
                title="WhatsApp Direct"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Boutique</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("new-arrivals");
                    scrollToSection("products");
                  }}
                  className="text-zinc-400 hover:text-[#f2c792] transition-colors"
                >
                  Nouveautés (USA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("hoodies-sweats");
                    scrollToSection("products");
                  }}
                  className="text-zinc-400 hover:text-[#f2c792] transition-colors"
                >
                  Hoodies & Sweats
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("tshirts-tops");
                    scrollToSection("products");
                  }}
                  className="text-zinc-400 hover:text-[#f2c792] transition-colors"
                >
                  T-Shirts Boxy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("pants-cargo");
                    scrollToSection("products");
                  }}
                  className="text-zinc-400 hover:text-[#f2c792] transition-colors"
                >
                  Pantalons Cargo
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Infos Clients</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-zinc-400 hover:text-[#f2c792] transition-colors"
                >
                  Avis Clients
                </button>
              </li>
              <li>
                <span className="text-zinc-400 cursor-default">Livraison 58 Wilayas</span>
              </li>
              <li>
                <span className="text-zinc-400 cursor-default">Paiement à la Livraison</span>
              </li>
              <li>
                <span className="text-zinc-400 cursor-default">100% Produits Originaux</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Newsletter</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Inscrivez-vous pour être informé de nos prochains arrivages directs des USA.
            </p>
            {isSubscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>Inscription réussie ! Merci.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative flex items-center bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 focus-within:border-[#c07a43] transition-colors">
                  <Mail className="h-4 w-4 text-zinc-500 mr-2 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-xs text-white placeholder-zinc-600 border-none outline-none focus:ring-0 w-full"
                  />
                  <button
                    type="submit"
                    className="text-zinc-400 hover:text-[#f2c792] transition-colors focus:outline-none"
                    title="S'abonner"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Middle Segment: Contacts, Hours & Physical Store Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-zinc-900 text-xs font-sans">
          
          {/* Address Block */}
          <div className="flex gap-3.5 items-start">
            <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c07a43] shrink-0">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-1">Notre Boutique à Oran</h5>
              <p className="text-zinc-400 leading-relaxed font-light">
                Cité Akid Lotfi (Rue 5 Juillet, à côté de l'adresse Maps), Bir El Djir, Oran, Algérie.
              </p>
              <a 
                href="https://maps.google.com?q=PCF8+49J%20Owes%20store%20Akid%20Lotfi,%20Rue%205%20Juillet%D8%8C%20Bir%20El%20Djir&ftid=0xd7e63007eb961f1:0x9e8629cce08b0fbd" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block mt-2 font-bold text-[#f2c792] hover:text-white transition-colors"
              >
                Ouvrir sur Google Maps 📍
              </a>
            </div>
          </div>

          {/* Contact Phones */}
          <div className="flex gap-3.5 items-start">
            <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c07a43] shrink-0">
              <Phone className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-1">Téléphone & WhatsApp</h5>
              <p className="text-zinc-400 leading-relaxed">
                Appels & Commandes directes :
              </p>
              <div className="space-y-1 mt-1 font-semibold text-white">
                <div className="flex items-center gap-1.5">
                  <span>📞</span>
                  <a href="tel:0698070162" className="hover:text-[#f2c792]">06-98-07-01-62</a>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">(WTSPA)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>📞</span>
                  <a href="tel:0663315190" className="hover:text-[#f2c792]">06-63-31-51-90</a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex gap-3.5 items-start">
            <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c07a43] shrink-0">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider mb-1">Heures d'ouverture</h5>
              <p className="text-zinc-400 leading-relaxed font-light">
                Nous vous accueillons tous les jours de la semaine :
              </p>
              <div className="mt-1 font-semibold text-white">
                Samedi — Jeudi : <span className="text-[#f2c792]">10:00 - 21:00</span>
                <br />
                Vendredi : <span className="text-zinc-500">15:00 - 21:00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-medium font-mono uppercase tracking-widest">
          <span>
            © {new Date().getFullYear()} OWES STORE. Tous droits réservés.
          </span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 fill-[#c07a43] text-[#c07a43]" /> for Oran, Algeria 🇩🇿
          </span>
        </div>

      </div>
    </footer>
  );
}
