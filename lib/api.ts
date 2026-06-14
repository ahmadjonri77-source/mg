import type {
  AuthUser,
  Banner,
  Brand,
  Category,
  DailyEssential,
  Footer,
  Product,
  ProductInput,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }
  return res.json() as Promise<T>;
}

async function send<T>(
  path: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? `Xatolik (${res.status})`);
  }
  return data as T;
}

export const getBanners = () => get<Banner[]>("/api/banners");
export const getProducts = (category?: string) =>
  get<Product[]>(
    `/api/products${category ? `?category=${encodeURIComponent(category)}` : ""}`
  );
export const getCategories = () => get<Category[]>("/api/categories");
export const getBrands = () => get<Brand[]>("/api/brands");
export const getDailyEssentials = () =>
  get<DailyEssential[]>("/api/daily-essentials");
export const getNavCategories = () => get<string[]>("/api/nav-categories");
export const getFooter = () => get<Footer>("/api/footer");

// --- Auth ---
export const login = (login: string, password: string) =>
  send<AuthUser>("/api/auth/login", "POST", { login, password });
export const register = (name: string, login: string, password: string) =>
  send<AuthUser>("/api/auth/register", "POST", { name, login, password });

// --- Product mutations (admin) ---
export const createProduct = (input: ProductInput) =>
  send<Product>("/api/products", "POST", input);
export const updateProduct = (id: number, input: ProductInput) =>
  send<Product>(`/api/products/${id}`, "PATCH", input);
export const deleteProduct = (id: number) =>
  send<Product>(`/api/products/${id}`, "DELETE");
