import React, { useState, useMemo } from "react";
import { X, Phone, ShoppingBag, Truck, MapPin, CheckCircle, MessageCircle, FileText, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { WILAYAS } from "../data";
import { Wilaya } from "../types";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useShop();

  // Form States
  const [fullName, setFullName] = useState("");
  const [phone1, setPhone1] = useState("");
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(31); // Default to Oran (31)
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<"home" | "desk">("home");

  // Flow State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [validationError, setValidationError] = useState("");

  const currentWilaya = useMemo(() => {
    return WILAYAS.find((w) => w.id === selectedWilayaId) || WILAYAS[30]; // Oran by default
  }, [selectedWilayaId]);

  const shippingCost = useMemo(() => {
    if (deliveryType === "home") {
      return currentWilaya.homeDeliveryPrice;
    } else {
      return currentWilaya.deskDeliveryPrice;
    }
  }, [currentWilaya, deliveryType]);

  const finalTotal = useMemo(() => {
    return cartTotal + shippingCost;
  }, [cartTotal, shippingCost]);

  // Handle Validation
  const validateForm = () => {
    if (!fullName.trim()) {
      setValidationError("Veuillez saisir votre nom complet.");
      return false;
    }
    if (fullName.trim().split(" ").length < 2) {
      setValidationError("Veuillez saisir votre Nom ET Prénom.");
      return false;
    }
    if (!phone1.trim()) {
      setValidationError("Veuillez saisir votre numéro de téléphone.");
      return false;
    }
    // Simple regex check for Algerian numbers (e.g. 05, 06, 07 followed by 8 digits, or with country code)
    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    const cleanPhone = phone1.replace(/\s+/g, "").replace("-", "");
    if (!phoneRegex.test(cleanPhone)) {
      setValidationError("Veuillez saisir un numéro de téléphone algérien valide (ex: 0698070162).");
      return false;
    }
    if (!commune.trim()) {
      setValidationError("Veuillez saisir votre commune.");
      return false;
    }
    if (!address.trim() && deliveryType === "home") {
      setValidationError("Veuillez indiquer votre adresse pour la livraison à domicile.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const generateOrderDetailsText = (orderId: string) => {
    let text = `*NOUVELLE COMMANDE OWES STORE* 🇺🇸\n`;
    text += `*Numéro de Commande :* #${orderId}\n\n`;
    text += `*🛍️ ARTICLES COMMANDEZ :*\n`;
    
    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}*\n`;
      text += `   • Taille : ${item.selectedSize}\n`;
      text += `   • Couleur : ${item.selectedColor.name}\n`;
      text += `   • Quantité : ${item.quantity}\n`;
      text += `   • Prix : ${item.product.price.toLocaleString()} DA\n\n`;
    });

    text += `*👤 INFORMATIONS CLIENT :*\n`;
    text += `• Nom Complet : *${fullName}*\n`;
    text += `• Téléphone : *${phone1}*\n`;
    text += `• Wilaya : *${currentWilaya.id} - ${currentWilaya.name} (${currentWilaya.nameAr})*\n`;
    text += `• Commune : *${commune}*\n`;
    text += `• Adresse : *${address || "Non spécifiée (Point Relais)"}*\n\n`;
    
    text += `*🚚 LIVRAISON :*\n`;
    text += `• Option : *${deliveryType === "home" ? "Livraison à Domicile" : "Stop Desk / Bureau Relais"}*\n`;
    text += `• Frais de port : *${shippingCost} DA*\n\n`;
    
    text += `*💰 TOTAL À PAYER (À la livraison) :*\n`;
    text += `• Sous-total : *${cartTotal.toLocaleString()} DA*\n`;
    text += `• Total Final : *${finalTotal.toLocaleString()} DA*\n\n`;
    text += `_Veuillez me confirmer la disponibilité et lancer l'expédition. Merci !_`;
    
    return text;
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = "OW-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(orderId);

    const messageText = generateOrderDetailsText(orderId);
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/213698070162?text=${encodedMessage}`;

    // Log order locally
    saveOrderLocally(orderId, "WhatsApp Checkout");

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    setIsSubmitted(true);
  };

  const handleSubmitCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = "OW-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(orderId);

    // Save locally
    saveOrderLocally(orderId, "Phone Call Checkout");

    setIsSubmitted(true);
  };

  const saveOrderLocally = (orderId: string, checkoutMethod: string) => {
    const orderData = {
      orderId,
      date: new Date().toISOString(),
      customer: {
        fullName,
        phone: phone1,
        wilaya: currentWilaya.name,
        commune,
        address,
        deliveryType
      },
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor.name,
        price: item.product.price
      })),
      subtotal: cartTotal,
      shipping: shippingCost,
      total: finalTotal,
      method: checkoutMethod,
      status: "En attente de confirmation"
    };

    const existingOrders = JSON.parse(localStorage.getItem("owes_orders") || "[]");
    localStorage.setItem("owes_orders", JSON.stringify([orderData, ...existingOrders]));
  };

  const handleFinish = () => {
    clearCart();
    onClose();
  };

  return (
    <div id="checkout-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      
      {/* Outer Card Wrapper */}
      <div
        id="checkout-modal-content"
        className="relative w-full max-w-4xl bg-[#121212] border border-[#c07a43]/30 rounded-3xl overflow-hidden shadow-2xl animate-scaleIn max-h-[90vh] flex flex-col"
      >
        {/* Header (Hide if submitted to let Success shine) */}
        {!isSubmitted && (
          <div className="flex items-center justify-between p-6 border-b border-zinc-900 bg-zinc-950/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#f2c792]" />
              <h2 className="text-lg font-black text-white uppercase tracking-wider font-serif" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                Finaliser ma commande (Paiement à la Livraison)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#f2c792] hover:text-white transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 font-sans">
          
          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 max-w-lg mx-auto">
              <div className="h-20 w-20 rounded-full bg-emerald-500/10 border-4 border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-scaleIn">
                <Check className="h-10 w-10 stroke-[3]" />
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                Merci pour votre commande !
              </h3>
              <p className="text-xs text-[#f2c792] font-mono tracking-widest uppercase mb-6">
                ID DE COMMANDE : #{generatedOrderId}
              </p>

              <div className="w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-6 text-left space-y-4 mb-8">
                <div className="text-xs text-zinc-400 leading-relaxed border-b border-zinc-900 pb-3">
                  📍 Vos informations de livraison à <strong>{commune}, {currentWilaya.name}</strong> ont été enregistrées avec succès.
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Méthode :</span>
                    <span className="font-semibold text-white">{deliveryType === "home" ? "À Domicile" : "Bureau Stop Desk"}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Destinataire :</span>
                    <span className="font-semibold text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Téléphone :</span>
                    <span className="font-semibold text-white">{phone1}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white font-extrabold pt-2.5 border-t border-zinc-900">
                    <span>Total à Payer :</span>
                    <span className="text-[#f2c792]">{finalTotal.toLocaleString()} DA</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-8">
                Notre équipe va vous contacter par téléphone ou WhatsApp sur le <strong>{phone1}</strong> pour confirmer la commande avant de l'expédier.
              </p>

              <button
                onClick={handleFinish}
                className="px-8 py-3.5 bg-white text-black hover:bg-[#f2c792] font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
              >
                Retour à la boutique
              </button>
            </div>
          ) : (
            
            /* DUAL COLUMN INPUT / SUMMARY FLOW */
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column: Checkout Inputs (3 cols) */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* General Info Badge */}
                <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-4 flex gap-3.5 items-center">
                  <div className="h-10 w-10 flex items-center justify-center bg-[#c07a43]/10 border border-[#c07a43]/30 rounded-full text-[#f2c792] shrink-0">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-white uppercase tracking-wider">Paiement à la Livraison (COD)</div>
                    <div className="text-zinc-500 mt-0.5 leading-relaxed">Saisissez vos coordonnées réelles. Vous payez l'expéditeur lors de la livraison.</div>
                  </div>
                </div>

                {/* Validation Warnings */}
                {validationError && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-3 rounded-xl font-medium animate-pulse">
                    ⚠️ {validationError}
                  </div>
                )}

                {/* Input Fields Form */}
                <form className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                      Nom & Prénom <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mohamed Amine"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] focus:ring-1 focus:ring-[#c07a43]/20 transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                      Numéro de Téléphone <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 0698070162"
                        value={phone1}
                        onChange={(e) => setPhone1(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] focus:ring-1 focus:ring-[#c07a43]/20 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Wilaya & Commune Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Wilaya Selection */}
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                        Wilaya <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={selectedWilayaId}
                        onChange={(e) => setSelectedWilayaId(Number(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c07a43] transition-all cursor-pointer font-medium"
                      >
                        {WILAYAS.map((w) => (
                          <option key={w.id} value={w.id}>
                            {w.code} - {w.name} ({w.nameAr})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Commune */}
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                        Commune <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Akid Lotfi / Bir El Djir"
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] focus:ring-1 focus:ring-[#c07a43]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Delivery Mode Option (Cards grid) */}
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">
                      Type de Livraison
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Home Delivery */}
                      <div
                        onClick={() => setDeliveryType("home")}
                        className={`border rounded-xl p-4 flex gap-3 cursor-pointer items-start transition-all select-none ${
                          deliveryType === "home"
                            ? "bg-[#c07a43]/10 border-[#c07a43] text-white shadow-md shadow-[#c07a43]/5"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliv"
                          checked={deliveryType === "home"}
                          onChange={() => {}} // Handle on parent div click
                          className="mt-1 text-[#c07a43] focus:ring-0"
                        />
                        <div className="text-left font-sans">
                          <span className="text-xs font-bold text-white block">À Domicile (Yalidine)</span>
                          <span className="text-[10px] text-zinc-500 block mt-1 leading-relaxed">
                            Livré directement à votre adresse.
                          </span>
                          <span className="text-xs font-bold text-[#f2c792] block mt-1">
                            +{currentWilaya.homeDeliveryPrice} DA
                          </span>
                        </div>
                      </div>

                      {/* Desk Delivery */}
                      <div
                        onClick={() => setDeliveryType("desk")}
                        className={`border rounded-xl p-4 flex gap-3 cursor-pointer items-start transition-all select-none ${
                          deliveryType === "desk"
                            ? "bg-[#c07a43]/10 border-[#c07a43] text-white shadow-md shadow-[#c07a43]/5"
                            : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliv"
                          checked={deliveryType === "desk"}
                          onChange={() => {}} // Handle on parent div click
                          className="mt-1 text-[#c07a43] focus:ring-0"
                        />
                        <div className="text-left font-sans">
                          <span className="text-xs font-bold text-white block">Bureau Stop Desk</span>
                          <span className="text-[10px] text-zinc-500 block mt-1 leading-relaxed">
                            À récupérer dans un bureau Yalidine local.
                          </span>
                          <span className="text-xs font-bold text-[#f2c792] block mt-1">
                            +{currentWilaya.deskDeliveryPrice} DA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address Details (Show if home delivery selected) */}
                  {deliveryType === "home" && (
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                        Adresse Complète <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Ex: Rue 5 Juillet, Cité Akid Lotfi, N° 42"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] focus:ring-1 focus:ring-[#c07a43]/20 transition-all font-sans"
                      />
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Order Summary (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-zinc-900">
                    Résumé de la commande
                  </div>

                  {/* Cart Items list (scrollable if many) */}
                  <div className="max-h-48 overflow-y-auto space-y-3.5 pr-2">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start text-xs font-sans">
                        <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover object-center" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white uppercase tracking-wide truncate">{item.product.name}</h4>
                          <div className="text-[10px] text-zinc-500 mt-0.5 flex gap-1.5 font-mono">
                            <span>Taille: {item.selectedSize}</span>
                            <span>•</span>
                            <span>Qte: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-zinc-300">
                          {(item.product.price * item.quantity).toLocaleString()} DA
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2.5 pt-4 border-t border-zinc-900 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Sous-total :</span>
                      <span className="font-semibold text-white">{cartTotal.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Livraison ({currentWilaya.name}) :</span>
                      <span className="font-semibold text-white">{shippingCost} DA</span>
                    </div>
                    
                    <div className="h-[1px] w-full bg-zinc-900 pt-1"></div>
                    
                    <div className="flex justify-between text-sm text-white font-extrabold pt-2">
                      <span>Total à payer :</span>
                      <span className="text-[#f2c792]">{finalTotal.toLocaleString()} DA</span>
                    </div>
                  </div>
                </div>

                {/* Submission CTA buttons block */}
                <div className="space-y-3">
                  {/* Checkout via WhatsApp */}
                  {/* <button
                    onClick={handleSubmitWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    Commander via WhatsApp
                  </button> */}

                  {/* Standard Order placement (calls customer for confirmation) */}
                  <button
                    onClick={handleSubmitCall}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[#f2c792] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:border-[#c07a43]/50 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    Confirmer Directement
                  </button>

                  <div className="text-[10px] text-zinc-500 text-center leading-relaxed px-4">
                    Une fois validée, un agent de <strong>Owes Store</strong> vous contactera pour planifier la livraison. Paiement en espèces à la livraison.
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
