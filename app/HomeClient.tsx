"use client";

import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import HeroCarousel from "./components/HeroCarousel";
import ProductSection from "./components/ProductSection";
import CategorySection from "./components/CategorySection";
import BrandSection from "./components/BrandSection";
import DailyEssentials from "./components/DailyEssentials";
import FooterSection from "./components/FooterSection";
import CartDrawer from "./components/CartDrawer";
import {
  getBanners,
  getBrands,
  getCategories,
  getDailyEssentials,
  getFooter,
  getNavCategories,
  getProducts,
} from "@/lib/api";
import type {
  Banner,
  Brand,
  Category,
  DailyEssential,
  Footer,
  Product,
} from "@/lib/types";

interface Data {
  banners: Banner[];
  products: Product[];
  categories: Category[];
  brands: Brand[];
  dailyEssentials: DailyEssential[];
  navCategories: string[];
  footer: Footer;
}

export default function HomeClient() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError(false);
    Promise.all([
      getBanners(),
      getProducts(),
      getCategories(),
      getBrands(),
      getDailyEssentials(),
      getNavCategories(),
      getFooter(),
    ])
      .then(([banners, products, categories, brands, dailyEssentials, navCategories, footer]) =>
        setData({ banners, products, categories, brands, dailyEssentials, navCategories, footer })
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <CircularProgress />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Ma&apos;lumotni yuklab bo&apos;lmadi
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Backend (API) ishlamayapti. Kompyuteringizda{" "}
            <code className="bg-slate-100 px-1 rounded">cd server &amp;&amp; npm start</code>{" "}
            bilan ishga tushiring, so&apos;ng qayta yuklang.
          </p>
          <Button variant="contained" onClick={load} sx={{ textTransform: "none" }}>
            Qayta urinish
          </Button>
        </div>
      </main>
    );
  }

  // Mahsulotlarni kategoriya bo'yicha guruhlaymiz.
  const grouped = new Map<string, Product[]>();
  for (const p of data.products) {
    const list = grouped.get(p.category) ?? [];
    list.push(p);
    grouped.set(p.category, list);
  }
  const sections = [...grouped.entries()].sort(([a], [b]) => {
    if (a === "Smartphones") return -1;
    if (b === "Smartphones") return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      <TopBar />
      <Header />
      <NavBar categories={data.navCategories} />

      <main className="flex-1 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <HeroCarousel banners={data.banners} />
        </div>

        {sections.map(([category, items]) => (
          <ProductSection
            key={category}
            prefix="Grab the best deal on"
            highlight={category}
            products={items}
          />
        ))}
        <CategorySection categories={data.categories} />
        <BrandSection brands={data.brands} />
        <DailyEssentials items={data.dailyEssentials} />
      </main>

      <FooterSection footer={data.footer} />
      <CartDrawer />
    </>
  );
}
