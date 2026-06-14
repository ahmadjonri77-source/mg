export interface Banner {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  bg: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  save: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Brand {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  bg: string;
  color: string;
}

export interface DailyEssential {
  id: number;
  name: string;
  subtitle: string;
  image: string;
}

export interface AuthUser {
  id: number;
  login: string;
  name: string;
  role: "admin" | "user";
}

export interface ProductInput {
  name: string;
  category?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  save?: number;
  image?: string;
}

export interface Footer {
  brand: string;
  contact: { whatsApp: string; call: string };
  popularCategories: string[];
  customerServices: string[];
  copyright: string;
}
