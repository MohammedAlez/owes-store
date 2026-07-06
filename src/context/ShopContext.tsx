import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, CartItem, Color } from "../types";
import initialData from "../data.json";

const mapJsonCategories = (cats: any[]): Category[] => {
  return cats.map((c) => ({
    id: c.id,
    slug: c.id,
    name: c.frenchLabel || c.label,
    image: c.image || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    label: c.label,
    frenchLabel: c.frenchLabel,
    arabicLabel: c.arabicLabel,
  }));
};

const mapJsonProducts = (prods: any[]): Product[] => {
  return prods.map((p) => ({
    id: p.id,
    name: p.frenchName || p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    description: p.description,
    images: p.images && p.images.length > 0 ? p.images : ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600"],
    category: p.category,
    sizes: p.sizes || ["S", "M", "L", "XL"],
    colors: (p.colors || []).map((c: any) => ({
      name: c.frenchName || c.name,
      hex: c.value || c.hex || "#111111",
      frenchName: c.frenchName,
      arabicName: c.arabicName,
      value: c.value,
    })),
    isNew: p.isNewArrival !== undefined ? p.isNewArrival : p.isNew,
    isBestSeller: p.isBestSeller,
    details: p.details,
    frenchName: p.frenchName,
    arabicName: p.arabicName,
    arabicDescription: p.arabicDescription,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    arabicDetails: p.arabicDetails,
  }));
};

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: Color) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateQuantity: (productId: string, size: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => mapJsonProducts(initialData.products));
  const [categories, setCategories] = useState<Category[]>(() => mapJsonCategories(initialData.categories));

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("owes_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data.json");
        return res.json();
      })
      .then((data) => {
        if (data.products && data.categories) {
          setProducts(mapJsonProducts(data.products));
          setCategories(mapJsonCategories(data.categories));
        }
      })
      .catch((err) => {
        console.error("Error fetching data.json:", err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("owes_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, size: string, color: Color) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.hex === color.hex
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
    });
    setIsCartOpen(true); // Auto open cart on add
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.hex === colorHex
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    colorHex: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorHex);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.hex === colorHex
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
