import React, { useState, useEffect, useMemo } from "react";
import { X, ShoppingBag, MessageCircle, ArrowRight, Check, ShieldCheck, Truck, RefreshCw, Phone, MapPin, CheckCircle, ArrowLeft, Heart } from "lucide-react";
import { Product, Color } from "../types";
import { useShop } from "../context/ShopContext";
import { WILAYAS } from "../data";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useShop();
  
  // Basic states
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Quick Order states
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWilayaId, setSelectedWilayaId] = useState<number>(31); // Default to Oran (31)
  const [commune, setCommune] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<"home" | "desk">("home");
  const [isQuickOrderSubmitted, setIsQuickOrderSubmitted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [validationError, setValidationError] = useState("");

  // Sync selected image if product changes
  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setShowQuickOrder(false);
    setIsQuickOrderSubmitted(false);
    setValidationError("");
  }, [product]);

  // Calculate quick order shipping cost
  const currentWilaya = useMemo(() => {
    return WILAYAS.find((w) => w.id === selectedWilayaId) || WILAYAS[30]; // Oran by default
  }, [selectedWilayaId]);

  const shippingCost = useMemo(() => {
    return deliveryType === "home" ? currentWilaya.homeDeliveryPrice : currentWilaya.deskDeliveryPrice;
  }, [currentWilaya, deliveryType]);

  const subtotal = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const finalTotal = useMemo(() => {
    return subtotal + shippingCost;
  }, [subtotal, shippingCost]);

  // Handle standard add to cart
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose(); // Close modal on successful add
    }, 1000);
  };

  // Standard WhatsApp Direct Inquiry
  const handleWhatsAppDirect = () => {
    const text = `Bonjour Owes Store,\nJe souhaite me renseigner sur l'article suivant :\n\n• Produit : *${product.name}*\n• Taille : *${selectedSize}*\n• Couleur : *${selectedColor.name}*\n• Quantité : *${quantity}*\n• Prix : *${product.price.toLocaleString()} DA*\n\nMerci de m'indiquer s'il est encore disponible.`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/213698070162?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  // Form Validation for Quick Order
  const validateForm = () => {
    if (!fullName.trim()) {
      setValidationError("Veuillez saisir votre nom complet.");
      return false;
    }
    if (fullName.trim().split(" ").length < 2) {
      setValidationError("Veuillez saisir votre Nom ET Prénom.");
      return false;
    }
    if (!phone.trim()) {
      setValidationError("Veuillez saisir votre numéro de téléphone.");
      return false;
    }
    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "").replace("-", "");
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

  // Quick Order submit (Save to localStorage and open WhatsApp prefilled order)
  const handleQuickOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderId = "QO-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(orderId);

    // Generate WhatsApp checkout message
    let msgText = `*COMMANDE RAPIDE OWES STORE* 🇺🇸\n`;
    msgText += `*Numéro de Commande :* #${orderId}\n\n`;
    msgText += `*🛍️ ARTICLE :*\n`;
    msgText += `• *${product.name}*\n`;
    msgText += `  - Taille : *${selectedSize}*\n`;
    msgText += `  - Couleur : *${selectedColor.name}*\n`;
    msgText += `  - Quantité : *${quantity}*\n`;
    msgText += `  - Prix : *${product.price.toLocaleString()} DA*\n\n`;

    msgText += `*👤 INFORMATIONS CLIENT :*\n`;
    msgText += `• Nom Complet : *${fullName}*\n`;
    msgText += `• Téléphone : *${phone}*\n`;
    msgText += `• Wilaya : *${currentWilaya.id} - ${currentWilaya.name} (${currentWilaya.nameAr})*\n`;
    msgText += `• Commune : *${commune}*\n`;
    msgText += `• Adresse : *${address || "Non spécifiée (Point Relais)"}*\n\n`;

    msgText += `*🚚 LIVRAISON :*\n`;
    msgText += `• Option : *${deliveryType === "home" ? "Livraison à Domicile" : "Stop Desk / Bureau Relais"}*\n`;
    msgText += `• Frais de port : *${shippingCost} DA*\n\n`;

    msgText += `*💰 TOTAL À PAYER (À la livraison) :*\n`;
    msgText += `• Total Final : *${finalTotal.toLocaleString()} DA*\n\n`;
    msgText += `_Veuillez me confirmer la disponibilité et lancer l'expédition rapide. Merci !_`;

    const encodedMsg = encodeURIComponent(msgText);
    const whatsappUrl = `https://wa.me/213698070162?text=${encodedMsg}`;

    // Save order details to local storage
    const orderData = {
      orderId,
      date: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        wilaya: currentWilaya.name,
        commune,
        address,
        deliveryType
      },
      items: [{
        id: product.id,
        name: product.name,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor.name,
        price: product.price
      }],
      subtotal: subtotal,
      shipping: shippingCost,
      total: finalTotal,
      method: "Product Modal Quick Order Form",
      status: "En attente de confirmation"
    };

    const existingOrders = JSON.parse(localStorage.getItem("owes_orders") || "[]");
    localStorage.setItem("owes_orders", JSON.stringify([orderData, ...existingOrders]));

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    setIsQuickOrderSubmitted(true);
  };

  return (
    <div id="product-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      
      {/* Container Panel */}
      <div
        id="product-modal-content"
        className="relative w-full max-w-5xl bg-[#1a1a1e] border border-[#c07a43]/30 rounded-3xl overflow-hidden shadow-2xl animate-scaleIn max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-zinc-900 border border-zinc-800 text-[#f2c792] hover:text-white transition-all cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-zinc-950/50">
          <div className="flex-1 flex items-center justify-center min-h-[300px] max-h-[450px] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center max-h-[450px] transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`h-16 w-16 rounded-xl overflow-hidden border-2 ${
                    selectedImage === img ? "border-[#c07a43]" : "border-zinc-800 opacity-60 hover:opacity-100"
                  } transition-all`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details or Order Form */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto max-h-[90vh] md:max-h-[unset] flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-900 font-sans">
          
          {/* SUCCESS SCREEN */}
          {isQuickOrderSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 flex-1">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                Commande Envoyée !
              </h3>
              <p className="text-xs text-[#f2c792] font-mono tracking-widest uppercase mb-4">
                ID COMMANDE : #{generatedOrderId}
              </p>
              
              <div className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-left space-y-3 mb-6 text-xs text-zinc-300">
                <p>📍 Votre commande de <strong>{product.name}</strong> a bien été enregistrée.</p>
                <div className="border-t border-zinc-900 pt-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Taille & Couleur :</span>
                    <span className="text-white font-semibold">{selectedSize} - {selectedColor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Destinataire :</span>
                    <span className="text-white font-semibold">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Téléphone :</span>
                    <span className="text-white font-semibold">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Total à Payer :</span>
                    <span className="text-[#f2c792] font-extrabold">{finalTotal.toLocaleString()} DA</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed mb-6">
                Nous allons vous appeler sur le <strong>{phone}</strong> pour confirmer votre commande avant de lancer l'expédition.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-white hover:bg-[#f2c792] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Retourner à la boutique
              </button>
            </div>
          ) : showQuickOrder ? (
            
            /* QUICK ORDER INPUT FIELDS FORM */
            <div className="flex flex-col flex-1">
              {/* Back Link Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-zinc-900 pb-4">
                <button
                  onClick={() => setShowQuickOrder(false)}
                  className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 text-[#f2c792]" /> Retour aux détails
                </button>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#c07a43] uppercase font-bold block mb-1">
                  ⚡ COMMANDE DIRECTE RAPIDE
                </span>
                <h2 className="text-base font-black text-white uppercase tracking-wider">
                  Saisissez vos Coordonnées
                </h2>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Achetez rapidement. Le paiement s'effectue en espèces à la réception de votre colis.
                </p>
              </div>

              {/* Validation error notice */}
              {validationError && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] px-3.5 py-2.5 rounded-xl font-medium mb-4 animate-pulse">
                  ⚠️ {validationError}
                </div>
              )}

              {/* Form elements */}
              <form onSubmit={handleQuickOrderSubmit} className="space-y-4 flex-1">
                {/* Product Summary Mini Card */}
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex gap-3 items-center text-xs">
                  <div className="h-10 w-8 rounded overflow-hidden shrink-0">
                    <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white uppercase truncate text-[11px]">{product.name}</h4>
                    <p className="text-[9px] font-mono text-[#f2c792] mt-0.5">
                      Taille: {selectedSize} | Couleur: {selectedColor.name} | Qte: {quantity}
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                    Nom & Prénom <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mohamed Amine"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                    Téléphone <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-600">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 0698070162"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Wilaya & Commune */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                      Wilaya <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={selectedWilayaId}
                      onChange={(e) => setSelectedWilayaId(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#c07a43] transition-all cursor-pointer font-medium"
                    >
                      {WILAYAS.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.code} - {w.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                      Commune <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Akid Lotfi"
                      value={commune}
                      onChange={(e) => setCommune(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] transition-all"
                    />
                  </div>
                </div>

                {/* Delivery Option Cards */}
                <div>
                  <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1.5">
                    Mode de Livraison
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setDeliveryType("home")}
                      className={`border rounded-xl p-2.5 flex gap-2 cursor-pointer items-start transition-all select-none ${
                        deliveryType === "home"
                          ? "bg-[#c07a43]/10 border-[#c07a43]"
                          : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={deliveryType === "home"}
                        onChange={() => {}}
                        className="mt-0.5 text-[#c07a43]"
                      />
                      <div className="text-left text-[10px]">
                        <span className="font-bold text-white block">À Domicile</span>
                        <span className="text-zinc-500 text-[9px]">+{currentWilaya.homeDeliveryPrice} DA</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setDeliveryType("desk")}
                      className={`border rounded-xl p-2.5 flex gap-2 cursor-pointer items-start transition-all select-none ${
                        deliveryType === "desk"
                          ? "bg-[#c07a43]/10 border-[#c07a43]"
                          : "bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={deliveryType === "desk"}
                        onChange={() => {}}
                        className="mt-0.5 text-[#c07a43]"
                      />
                      <div className="text-left text-[10px]">
                        <span className="font-bold text-white block">Stop Desk</span>
                        <span className="text-zinc-500 text-[9px]">+{currentWilaya.deskDeliveryPrice} DA</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address (Show if Home selected) */}
                {deliveryType === "home" && (
                  <div>
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                      Adresse Complète <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Cité Akid Lotfi, N° 42"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#c07a43] transition-all"
                    />
                  </div>
                )}

                {/* Pricing Summary Row */}
                <div className="pt-3 border-t border-zinc-900 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Sous-total ({quantity}x) :</span>
                    <span className="font-semibold text-white">{subtotal.toLocaleString()} DA</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Frais de port ({currentWilaya.name}) :</span>
                    <span className="font-semibold text-white">{shippingCost} DA</span>
                  </div>
                  <div className="flex justify-between text-white font-extrabold text-xs pt-1 border-t border-zinc-900/40">
                    <span>Total Final à payer :</span>
                    <span className="text-[#f2c792]">{finalTotal.toLocaleString()} DA</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#c07a43] hover:bg-[#a6622d] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md hover:shadow-lg mt-3"
                >
                  <MessageCircle className="h-4 w-4" /> Confirmer ma Commande ({finalTotal.toLocaleString()} DA)
                </button>
              </form>
            </div>
          ) : (
            
            /* ORIGINAL DETAILS AND SPECS VIEW */
            <div className="flex flex-col flex-1 justify-between">
              <div>
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#f2c792] bg-[#c07a43]/10 border border-[#c07a43]/30 px-2 py-0.5 rounded-md">
                    Original US 🇺🇸
                  </span>
                  {product.isNew && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      Nouveau
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2 leading-tight">
                  {product.name}
                </h1>

                {/* Price display */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-black text-[#f2c792] tracking-wide">
                    {product.price.toLocaleString()} DA
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-zinc-500">
                      {product.originalPrice.toLocaleString()} DA
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="h-[1px] w-full bg-zinc-900 mb-6"></div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Form Fields: Color selector */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2.5">
                    Couleur : <span className="text-[#f2c792]">{selectedColor.name}</span>
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                          selectedColor.hex === color.hex ? "border-[#c07a43] scale-110" : "border-transparent"
                        } transition-all`}
                        title={color.name}
                      >
                        <span
                          className="h-6 w-6 rounded-full border border-black/20 block"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields: Size selector */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block">
                      Taille : <span className="text-[#f2c792]">{selectedSize}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 min-w-10 px-3 flex items-center justify-center rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                          selectedSize === size
                            ? "bg-[#c07a43] border-transparent text-white shadow-md shadow-[#c07a43]/20"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-2.5">
                    Quantité
                  </span>
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl w-32 justify-between p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-[#f2c792] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-[#f2c792] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Call-to-Actions (Add to Cart / Direct Quick Order / WhatsApp Direct) */}
              <div className="space-y-3">
                {/* Standard Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    isAdded 
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-white text-black hover:bg-[#f2c792] active:scale-[0.98] shadow-md hover:shadow-lg"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Ajouter au Panier
                    </>
                  )}
                </button>

                {/* ⚡ direct Quick order button */}
                <button
                  onClick={() => setShowQuickOrder(true)}
                  className="w-full flex items-center justify-center gap-2 bg-[#c07a43] hover:bg-[#a6622d] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>⚡ Commande Rapide (Sans Panier)</span>
                </button>

                {/* Secondary Direct Inquiry */}
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-[#25d366] py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-[#25d366]" />
                  Se renseigner via WhatsApp
                </button>

                {/* Shopping Benefits Block */}
                <div className="grid grid-cols-3 gap-2 pt-6 border-t border-zinc-900 text-center font-sans">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="h-4 w-4 text-[#f2c792] mb-1.5" />
                    <span className="text-[8px] font-mono font-medium text-zinc-400 uppercase tracking-wider">Qualité US 100% Originale</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="h-4 w-4 text-[#f2c792] mb-1.5" />
                    <span className="text-[8px] font-mono font-medium text-zinc-400 uppercase tracking-wider">Livraison 58 Wilayas</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-4 w-4 text-[#f2c792] mb-1.5" />
                    <span className="text-[8px] font-mono font-medium text-zinc-400 uppercase tracking-wider">Échange Simple & Rapide</span>
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
