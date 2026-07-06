import { Product, Category, Testimonial, Wilaya } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: "2",
    name: "Hoodies & Sweats",
    slug: "hoodies-sweats",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: "3",
    name: "T-Shirts & Tops",
    slug: "tshirts-tops",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: "4",
    name: "Pants & Cargo",
    slug: "pants-cargo",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600&h=800",
  },
  {
    id: "5",
    name: "Accessories & Caps",
    slug: "accessories-caps",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=600&h=800",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Premium Original US Heavyweight Hoodie",
    price: 8500,
    originalPrice: 11000,
    description: "Our signature heavyweight hoodie, imported from premium US stocks. Crafted from ultra-soft 450GSM organic loopback cotton, featuring drop shoulders, a double-lined hood, and seamless ribbing. A timeless minimalist essential designed to endure.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&q=80&w=800"
    ],
    category: "hoodies-sweats",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Black", hex: "#1c1917" },
      { name: "Desert Sand", hex: "#eab308" },
      { name: "Oatmeal Melange", hex: "#e5e5e5" }
    ],
    isNew: true,
    isBestSeller: true,
    details: [
      "100% Premium US Organic Cotton",
      "Heavyweight 450GSM loopback terry",
      "Double-layered spacious hood without drawstrings for a clean editorial look",
      "Ribbed cuffs and waistband with elastane",
      "Pre-shrunk to maintain shape and fit for years"
    ]
  },
  {
    id: "p2",
    name: "Editorial Boxy Fit T-Shirt",
    price: 4200,
    description: "A luxury wardrobe staple. Features a high-tight crewneck collar, relaxed boxy silhouette, and heavyweight 260GSM combed cotton construction. Designed to hold its structure beautifully.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"
    ],
    category: "tshirts-tops",
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "Owes Copper", hex: "#c07a43" },
      { name: "Alabaster White", hex: "#fafafa" },
      { name: "Midnight Black", hex: "#09090b" }
    ],
    isNew: true,
    isBestSeller: false,
    details: [
      "100% Combed ringspun cotton",
      "Heavyweight 260GSM pre-shrunk jersey",
      "1.2-inch thick rib neckband",
      "Slightly dropped shoulders",
      "Side-seamed luxury construction"
    ]
  },
  {
    id: "p3",
    name: "Classic US Premium Flight Jacket",
    price: 14500,
    originalPrice: 18000,
    description: "An authentic military-inspired US flight jacket. Water-resistant nylon shell with a warm satin lining, heavy-duty silver metal zippers, and classic utility sleeve pocket. A bold standout piece for the modern Algerian wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800"
    ],
    category: "new-arrivals",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sage Green", hex: "#3f4f44" },
      { name: "Midnight Black", hex: "#09090b" }
    ],
    isNew: false,
    isBestSeller: true,
    details: [
      "Premium flight grade water-resistant nylon",
      "Polyester fiber fill insulation for Oran's fresh winter breeze",
      "Heavy duty brass zippers and hardware",
      "Classic utility pocket on left sleeve",
      "Knit collar, cuffs and waistband"
    ]
  },
  {
    id: "p4",
    name: "Heavy Twill Modular Cargo Pants",
    price: 7800,
    description: "Designed with both utility and high-fashion in mind. Crafted from robust 100% cotton heavy twill, featuring articulated knees, 3D cargo pockets with custom snap closures, and adjustable ankle cuffs to switch between straight and tapered styling.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=800"
    ],
    category: "pants-cargo",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Olive Drab", hex: "#4b5320" },
      { name: "Khaki Sand", hex: "#d7c49e" },
      { name: "Charcoal", hex: "#27272a" }
    ],
    isNew: true,
    isBestSeller: false,
    details: [
      "100% Cotton heavy utility twill",
      "Double-reinforced seat and knees",
      "Adjustable drawstring waistband and leg cuffs",
      "Hidden snap buttons on pocket flaps",
      "Finished with hand-distressed vintage wash"
    ]
  },
  {
    id: "p5",
    name: "Owes Vintage Canvas Cap",
    price: 3200,
    originalPrice: 4000,
    description: "An elegant, unstructured 6-panel cap crafted from custom-dyed heavy canvas. Features a beautifully curved brim, adjustable brass buckle clasp, and a subtle embroidered logo detailing. The perfect casual accessory.",
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&q=80&w=800"
    ],
    category: "accessories-caps",
    sizes: ["One Size"],
    colors: [
      { name: "Tobacco Brown", hex: "#78350f" },
      { name: "Washed Olive", hex: "#52525b" },
      { name: "Vintage Cream", hex: "#fef08a" }
    ],
    isNew: false,
    isBestSeller: true,
    details: [
      "100% Washed heavy cotton canvas",
      "Unstructured, low-profile fit",
      "Adjustable strap with solid brass slider",
      "Embroidered tonal eyelets for breathability",
      "Vapor-dyed for a genuine worn-in aesthetic"
    ]
  },
  {
    id: "p6",
    name: "Luxury Oversized Wool-Blend Overcoat",
    price: 19500,
    description: "A premium, sophisticated outer piece designed for the discerning gentleman. Made from a thick wool-blend weave with full inner lining, single-breasted horn button closure, and refined notch lapels. Elevates any outfit instantly.",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800"
    ],
    category: "new-arrivals",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Owes Sand", hex: "#d4b996" },
      { name: "Pitch Black", hex: "#020202" }
    ],
    isNew: true,
    isBestSeller: true,
    details: [
      "70% Wool, 30% Premium Polyester blend",
      "Soft micro-satin full length lining",
      "Internal chest welt pockets",
      "Rear center vent for comfort and movement",
      "Expertly tailored shoulders"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Amine Ramy",
    location: "Local Guide · 11 avis · 6 photos",
    rating: 5,
    text: "Une excellente adresse à Oran ! Des produits de marque authentiques importés directement des USA, un service client très réactif sur WhatsApp et un accueil formidable à la boutique. Je recommande vivement.",
    date: "Il y a 7 mois"
  },
  {
    id: "2",
    name: "Yo Be",
    location: "2 avis · 1 photo",
    rating: 5,
    text: "Boutique de confiance. J'ai commandé des articles et la livraison a été rapide, les vêtements sont d'une excellente qualité et 100% originaux. Top !",
    date: "Il y a un an"
  },
  {
    id: "3",
    name: "Sidi Mohammed Semmoud",
    location: "Local Guide · 37 avis · 71 photos",
    rating: 5,
    text: "Très bon accueil chaleureux, des articles de marques prestigieuses authentiques et à la hauteur des attentes. Le service livraison et le suivi client sont parfaits.",
    date: "Il y a un an"
  },
  {
    id: "4",
    name: "Senousi Guenzet",
    location: "Client vérifié",
    rating: 5,
    text: "La qualité est incroyable, des vêtements de grandes marques introuvables ailleurs en Algérie. Je recommande sans hésitation !",
    date: "Il y a un an"
  },
  {
    id: "5",
    name: "Chakib Motam",
    location: "Client fidèle",
    rating: 5,
    text: "Une des meilleures boutiques pour s'habiller avec des produits originaux de qualité supérieure. Toujours un plaisir de commander chez eux.",
    date: "Il y a 3 ans"
  },
  {
    id: "6",
    name: "oussama sidhoum",
    location: "2 photos",
    rating: 5,
    text: "Des vêtements et sneakers haut de gamme, service rapide et fiable. Les détails de chaque article font la différence.",
    date: "Il y a 3 ans"
  }
];

// 58 Wilayas of Algeria with realistic shipping rates for Home Delivery (Yalidine rate) and Desk Delivery (Stop Desk / Point Relais)
export const WILAYAS: Wilaya[] = [
  { id: 1, code: "01", name: "Adrar", nameAr: "أدرار", homeDeliveryPrice: 1200, deskDeliveryPrice: 800 },
  { id: 2, code: "02", name: "Chlef", nameAr: "الشلف", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 3, code: "03", name: "Laghouat", nameAr: "الأغواط", homeDeliveryPrice: 900, deskDeliveryPrice: 500 },
  { id: 4, code: "04", name: "Oum El Bouaghi", nameAr: "أم البواقي", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 5, code: "05", name: "Batna", nameAr: "باتنة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 6, code: "06", name: "Béjaïa", nameAr: "بجاية", homeDeliveryPrice: 750, deskDeliveryPrice: 450 },
  { id: 7, code: "07", name: "Biskra", nameAr: "بسكرة", homeDeliveryPrice: 850, deskDeliveryPrice: 500 },
  { id: 8, code: "08", name: "Béchar", nameAr: "بشار", homeDeliveryPrice: 1100, deskDeliveryPrice: 700 },
  { id: 9, code: "09", name: "Blida", nameAr: "البليدة", homeDeliveryPrice: 600, deskDeliveryPrice: 350 },
  { id: 10, code: "10", name: "Bouira", nameAr: "البويرة", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 11, code: "11", name: "Tamanrasset", nameAr: "تمنراست", homeDeliveryPrice: 1500, deskDeliveryPrice: 900 },
  { id: 12, code: "12", name: "Tébessa", nameAr: "تبسة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 13, code: "13", name: "Tlemcen", nameAr: "تلمسان", homeDeliveryPrice: 650, deskDeliveryPrice: 350 },
  { id: 14, code: "14", name: "Tiaret", nameAr: "تيارت", homeDeliveryPrice: 750, deskDeliveryPrice: 400 },
  { id: 15, code: "15", name: "Tizi Ouzou", nameAr: "تيزي وزو", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 16, code: "16", name: "Alger", nameAr: "الجزائر", homeDeliveryPrice: 500, deskDeliveryPrice: 300 },
  { id: 17, code: "17", name: "Djelfa", nameAr: "الجلفة", homeDeliveryPrice: 850, deskDeliveryPrice: 500 },
  { id: 18, code: "18", name: "Jijel", nameAr: "جيجل", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 19, code: "19", name: "Sétif", nameAr: "سطيف", homeDeliveryPrice: 750, deskDeliveryPrice: 400 },
  { id: 20, code: "20", name: "Saïda", nameAr: "سعيدة", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 21, code: "21", name: "Skikda", nameAr: "سكيكدة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 22, code: "22", name: "Sidi Bel Abbès", nameAr: "سيدي بلعباس", homeDeliveryPrice: 600, deskDeliveryPrice: 350 },
  { id: 23, code: "23", name: "Annabat", nameAr: "عنابة", homeDeliveryPrice: 750, deskDeliveryPrice: 400 },
  { id: 24, code: "24", name: "Guelma", nameAr: "قالمة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 25, code: "25", name: "Constantine", nameAr: "قسنطينة", homeDeliveryPrice: 750, deskDeliveryPrice: 400 },
  { id: 26, code: "26", name: "Médéa", nameAr: "المدية", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 27, code: "27", name: "Mostaganem", nameAr: "مستغانم", homeDeliveryPrice: 600, deskDeliveryPrice: 350 },
  { id: 28, code: "28", name: "M'Sila", nameAr: "المسيلة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 29, code: "29", name: "Mascara", nameAr: "معسكر", homeDeliveryPrice: 650, deskDeliveryPrice: 350 },
  { id: 30, code: "30", name: "Ouargla", nameAr: "ورقلة", homeDeliveryPrice: 900, deskDeliveryPrice: 550 },
  { id: 31, code: "31", name: "Oran", nameAr: "وهران", homeDeliveryPrice: 400, deskDeliveryPrice: 200 },
  { id: 32, code: "32", name: "El Bayadh", nameAr: "البيض", homeDeliveryPrice: 850, deskDeliveryPrice: 500 },
  { id: 33, code: "33", name: "Illizi", nameAr: "إليزي", homeDeliveryPrice: 1500, deskDeliveryPrice: 900 },
  { id: 34, code: "34", name: "Bordj Bou Arréridj", nameAr: "برج بوعريريج", homeDeliveryPrice: 750, deskDeliveryPrice: 400 },
  { id: 35, code: "35", name: "Boumerdès", nameAr: "بومرداس", homeDeliveryPrice: 600, deskDeliveryPrice: 350 },
  { id: 36, code: "36", name: "El Tarf", nameAr: "الطارف", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 37, code: "37", name: "Tindouf", nameAr: "تندوف", homeDeliveryPrice: 1500, deskDeliveryPrice: 1000 },
  { id: 38, code: "38", name: "Tissemsilt", nameAr: "تيسمسيلت", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 39, code: "39", name: "El Oued", nameAr: "الوادي", homeDeliveryPrice: 900, deskDeliveryPrice: 550 },
  { id: 40, code: "40", name: "Khenchela", nameAr: "خنشلة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 41, code: "41", name: "Souk Ahras", nameAr: "سوق أهراس", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 42, code: "42", name: "Tipaza", nameAr: "تيبازة", homeDeliveryPrice: 650, deskDeliveryPrice: 350 },
  { id: 43, code: "43", name: "Mila", nameAr: "ميلة", homeDeliveryPrice: 800, deskDeliveryPrice: 450 },
  { id: 44, code: "44", name: "Aïn Defla", nameAr: "عين الدفلى", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 45, code: "45", name: "Naâma", nameAr: "النعامة", homeDeliveryPrice: 900, deskDeliveryPrice: 550 },
  { id: 46, code: "46", name: "Aïn Témouchent", nameAr: "عين تموشنت", homeDeliveryPrice: 600, deskDeliveryPrice: 350 },
  { id: 47, code: "47", name: "Ghardaïa", nameAr: "غرداية", homeDeliveryPrice: 850, deskDeliveryPrice: 500 },
  { id: 48, code: "48", name: "Relizane", nameAr: "غليزان", homeDeliveryPrice: 700, deskDeliveryPrice: 400 },
  { id: 49, code: "49", name: "El M'Ghair", nameAr: "المغير", homeDeliveryPrice: 900, deskDeliveryPrice: 550 },
  { id: 50, code: "50", name: "El Meniaa", nameAr: "المنيعة", homeDeliveryPrice: 950, deskDeliveryPrice: 550 },
  { id: 51, code: "51", name: "Ouled Djellal", nameAr: "أولاد جلال", homeDeliveryPrice: 850, deskDeliveryPrice: 500 },
  { id: 52, code: "52", name: "Bordj Baji Mokhtar", nameAr: "برج باجي مختار", homeDeliveryPrice: 1600, deskDeliveryPrice: 1000 },
  { id: 53, code: "53", name: "Béni Abbès", nameAr: "بني عباس", homeDeliveryPrice: 1100, deskDeliveryPrice: 700 },
  { id: 54, code: "54", name: "Timimoun", nameAr: "تيميمون", homeDeliveryPrice: 1200, deskDeliveryPrice: 800 },
  { id: 55, code: "55", name: "Touggourt", nameAr: "تقرت", homeDeliveryPrice: 900, deskDeliveryPrice: 550 },
  { id: 56, code: "56", name: "Djanet", nameAr: "جانت", homeDeliveryPrice: 1600, deskDeliveryPrice: 1000 },
  { id: 57, code: "57", name: "In Salah", nameAr: "عين صالح", homeDeliveryPrice: 1300, deskDeliveryPrice: 850 },
  { id: 58, code: "58", name: "In Guezzam", nameAr: "عين قزام", homeDeliveryPrice: 1700, deskDeliveryPrice: 1100 }
];
