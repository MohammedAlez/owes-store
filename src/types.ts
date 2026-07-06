export interface Color {
  name: string;
  hex: string;
  frenchName?: string;
  arabicName?: string;
  value?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // in Dinar (DA)
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: Color[];
  isNew?: boolean;
  isBestSeller?: boolean;
  details?: string[];
  frenchName?: string;
  arabicName?: string;
  arabicDescription?: string;
  rating?: number;
  reviewsCount?: number;
  arabicDetails?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  label?: string;
  frenchLabel?: string;
  arabicLabel?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: Color;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: string;
  nameAr: string;
  homeDeliveryPrice: number;
  deskDeliveryPrice: number;
}
