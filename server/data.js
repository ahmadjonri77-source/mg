// In-memory data store for the MegaMart API.
// Image URLs use picsum.photos seeded endpoints so they load reliably offline-ish.
const img = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/400/400`;

const banners = [
  {
    id: 1,
    eyebrow: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    subtitle: "UP TO 80% OFF",
    image: img("smartwatch-hero"),
    bg: "#2b3450",
  },
  {
    id: 2,
    eyebrow: "Best Deal Online on smartphones",
    title: "SMARTPHONE FEST.",
    subtitle: "UP TO 70% OFF",
    image: img("smartphone-hero"),
    bg: "#1f3a5f",
  },
  {
    id: 3,
    eyebrow: "Best Deal Online on headphones",
    title: "AUDIO MANIA.",
    subtitle: "UP TO 60% OFF",
    image: img("headphone-hero"),
    bg: "#3a2b50",
  },
];

const products = [
  { id: 1, name: "Galaxy S22 Ultra", category: "Smartphones", price: 32999, oldPrice: 74999, discount: 56, save: 32999, image: img("galaxy-s22-ultra") },
  { id: 2, name: "Galaxy M13 (4GB | 64 GB)", category: "Smartphones", price: 10499, oldPrice: 14999, discount: 56, save: 4500, image: img("galaxy-m13") },
  { id: 3, name: "Galaxy M33 (4GB | 64 GB)", category: "Smartphones", price: 16999, oldPrice: 24999, discount: 56, save: 8000, image: img("galaxy-m33") },
  { id: 4, name: "Galaxy M53 (4GB | 64 GB)", category: "Smartphones", price: 31999, oldPrice: 40999, discount: 56, save: 9000, image: img("galaxy-m53") },
  { id: 5, name: "Galaxy S22 Ultra", category: "Smartphones", price: 67999, oldPrice: 85999, discount: 56, save: 18000, image: img("galaxy-s22-ultra-2") },
  { id: 6, name: "iPhone 14 Pro (128 GB)", category: "Smartphones", price: 119999, oldPrice: 139999, discount: 14, save: 20000, image: img("iphone-14-pro") },
];

const categories = [
  { id: 1, name: "Mobile", image: img("cat-mobile") },
  { id: 2, name: "Cosmetics", image: img("cat-cosmetics") },
  { id: 3, name: "Electronics", image: img("cat-electronics") },
  { id: 4, name: "Furniture", image: img("cat-furniture") },
  { id: 5, name: "Watches", image: img("cat-watches") },
  { id: 6, name: "Decor", image: img("cat-decor") },
  { id: 7, name: "Accessories", image: img("cat-accessories") },
];

const brands = [
  { id: 1, name: "IPHONE", title: "iPhone", subtitle: "UP TO 80% OFF", image: img("brand-iphone"), bg: "#2d2d2d", color: "#ffffff" },
  { id: 2, name: "REALME", title: "realme", subtitle: "UP TO 80% OFF", image: img("brand-realme"), bg: "#f6e7c1", color: "#1a1a1a" },
  { id: 3, name: "XIAOMI", title: "Mi", subtitle: "UP TO 80% OFF", image: img("brand-xiaomi"), bg: "#f7d9c4", color: "#1a1a1a" },
];

const dailyEssentials = [
  { id: 1, name: "Daily Essentials", subtitle: "UP TO 50% OFF", image: img("essentials-basket") },
  { id: 2, name: "Vegitables", subtitle: "UP TO 50% OFF", image: img("essentials-veg") },
  { id: 3, name: "Fruits", subtitle: "UP TO 50% OFF", image: img("essentials-fruits") },
  { id: 4, name: "Strawberry", subtitle: "UP TO 50% OFF", image: img("essentials-strawberry") },
  { id: 5, name: "Mango", subtitle: "UP TO 50% OFF", image: img("essentials-mango") },
  { id: 6, name: "Cherry", subtitle: "UP TO 50% OFF", image: img("essentials-cherry") },
];

const navCategories = [
  "Groceries",
  "Premium Fruits",
  "Home & Kitchen",
  "Fashion",
  "Electronics",
  "Beauty",
  "Home Improvement",
  "Sports, Toys & Luggage",
];

const footer = {
  brand: "MegaMart",
  contact: {
    whatsApp: "+1 202-918-2132",
    call: "+1 202-918-2132",
  },
  popularCategories: [
    "Staples",
    "Beverages",
    "Personal Care",
    "Home Care",
    "Baby Care",
    "Vegetables & Fruits",
    "Snacks & Foods",
    "Dairy & Bakery",
  ],
  customerServices: [
    "About Us",
    "Terms & Conditions",
    "FAQ",
    "Privacy Policy",
    "E-waste Policy",
    "Cancellation & Return Policy",
  ],
  copyright: "© 2022 All rights reserved. Reliance Retail Ltd.",
};

// Demo users. In a real app, passwords would be hashed.
const users = [
  { id: 1, login: "admin", password: "admin123", name: "Administrator", role: "admin" },
  { id: 2, login: "user", password: "user123", name: "Demo User", role: "user" },
];

// --- Persistence ---
// Mutable collections (products, users) are persisted to db.json so that
// admin changes survive server restarts. Static content stays in code.
const fs = require("fs");
const path = require("path");
const DB_FILE = path.join(__dirname, "db.json");

function save() {
  try {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ products, users }, null, 2),
      "utf8"
    );
  } catch (err) {
    console.error("DB saqlashda xatolik:", err.message);
  }
}

// On startup: load persisted data if it exists (replace array contents
// in place so existing references stay valid).
if (fs.existsSync(DB_FILE)) {
  try {
    const saved = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    if (Array.isArray(saved.products)) {
      products.length = 0;
      products.push(...saved.products);
    }
    if (Array.isArray(saved.users)) {
      users.length = 0;
      users.push(...saved.users);
    }
    console.log(`DB yuklandi: ${products.length} mahsulot, ${users.length} user`);
  } catch (err) {
    console.error("DB o'qishda xatolik, default ma'lumot ishlatiladi:", err.message);
  }
} else {
  // First run: write the defaults so the file exists.
  save();
}

module.exports = {
  banners,
  products,
  categories,
  brands,
  dailyEssentials,
  navCategories,
  footer,
  users,
  save,
};
