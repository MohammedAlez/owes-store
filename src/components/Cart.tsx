import React from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end">
      {/* Dark blur backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Cart Container panel */}
      <div
        id="cart-drawer-content"
        className="relative w-full max-w-md bg-[#121212] border-l border-[#c07a43]/20 h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl animate-slideInRight font-sans z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#f2c792]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">Mon Panier</h2>
            <span className="bg-zinc-900 text-[#f2c792] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border border-zinc-800">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#f2c792] hover:text-white transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List of added products */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-900 text-[#c07a43] mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xs uppercase font-bold text-white tracking-widest">Votre panier est vide</h3>
              <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
                Parcourez nos catégories et ajoutez des vêtements originaux des USA à votre panier.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-[#c07a43]/50 text-xs font-semibold text-[#f2c792] uppercase tracking-widest rounded-xl transition-all"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}`}
                className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all font-sans"
              >
                {/* Product Thumbnail */}
                <div className="h-20 w-16 rounded-xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info and controls */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Variant selections */}
                    <div className="flex flex-wrap gap-1.5 mt-1 text-[9px] font-mono font-semibold uppercase tracking-widest text-[#f2c792]">
                      <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">Taille: {item.selectedSize}</span>
                      <span className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded flex items-center gap-1">
                        Couleur: 
                        <span 
                          className="h-1.5 w-1.5 rounded-full inline-block border border-white/20" 
                          style={{ backgroundColor: item.selectedColor.hex }}
                        ></span> 
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Qty manipulation */}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-extrabold text-[#f2c792] tracking-wide">
                      {(item.product.price * item.quantity).toLocaleString()} DA
                    </span>

                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, item.quantity - 1)}
                        className="h-6 w-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-500 hover:text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-2.5 font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, item.quantity + 1)}
                        className="h-6 w-6 flex items-center justify-center rounded hover:bg-zinc-800 text-zinc-500 hover:text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions panel */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-900 pt-6 space-y-4 font-sans bg-[#121212]">
            {/* Total summary */}
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Sous-total :</span>
              <span className="text-xl font-extrabold text-[#f2c792] tracking-wide">
                {cartTotal.toLocaleString()} DA
              </span>
            </div>
            
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              * Les frais de livraison sont calculés lors de la validation finale selon votre wilaya. Paiement en espèces à la livraison.
            </p>

            {/* Direct buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-[#f2c792] py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Valider ma commande <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
