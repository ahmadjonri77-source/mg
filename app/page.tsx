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

export default async function Home() {
  const [
    banners,
    products,
    categories,
    brands,
    dailyEssentials,
    navCategories,
    footer,
  ] = await Promise.all([
    getBanners(),
    getProducts(),
    getCategories(),
    getBrands(),
    getDailyEssentials(),
    getNavCategories(),
    getFooter(),
  ]);

  // Mahsulotlarni kategoriya bo'yicha guruhlaymiz — har biri o'z bo'limiga.
  const grouped = new Map<string, typeof products>();
  for (const p of products) {
    const list = grouped.get(p.category) ?? [];
    list.push(p);
    grouped.set(p.category, list);
  }
  // Smartphones birinchi, qolganlari nomi bo'yicha.
  const sections = [...grouped.entries()].sort(([a], [b]) => {
    if (a === "Smartphones") return -1;
    if (b === "Smartphones") return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      <TopBar />
      <Header />
      <NavBar categories={navCategories} />

      <main className="flex-1 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <HeroCarousel banners={banners} />
        </div>

        {sections.map(([category, items]) => (
          <ProductSection
            key={category}
            prefix="Grab the best deal on"
            highlight={category}
            products={items}
          />
        ))}
        <CategorySection categories={categories} />
        <BrandSection brands={brands} />
        <DailyEssentials items={dailyEssentials} />
      </main>

      <FooterSection footer={footer} />
      <CartDrawer />
    </>
  );
}
