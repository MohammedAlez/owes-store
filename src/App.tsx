import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";

function ShopAppContent() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useShop();

  return (
    <div className="min-h-screen bg-[#1a1a1e] text-white selection:bg-[#c07a43] selection:text-white overflow-x-clip">
      {/* Dynamic Slide-over Cart Drawer */}
      <Cart />

      {/* Main Page Layout */}
      <Header />
      <Hero />
      <Categories />
      <Products />
      <Testimonials />
      <Footer />

      {/* Algerian Order Checkout Form Dialog */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <ShopAppContent />
    </ShopProvider>
  );
}
