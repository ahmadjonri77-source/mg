# MegaMart

Next.js (App Router) e-commerce frontend + alohida Express backend (Swagger bilan).

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Material UI, Zustand, Express, Swagger.

## Imkoniyatlar

- Bosh sahifa: hero slider, kategoriya bo'yicha mahsulot bo'limlari, kategoriyalar, brendlar, daily essentials, footer
- Savatcha (Zustand + localStorage)
- Login / Register (login + parol), rol asosida (admin / user)
- **Admin panel** (`/admin`): mahsulotlarni ko'rish, qo'shish, tahrirlash, o'chirish + kompyuterdan rasm yuklash
- Backend REST API + **Swagger** hujjatlari
- Ma'lumotlar `server/db.json` ga saqlanadi (restartda yo'qolmaydi)

## Ishga tushirish

### 1. Backend (port 4000)

```bash
cd server
npm install
npm start
```

- API: http://localhost:4000
- Swagger: http://localhost:4000/api-docs

### 2. Frontend (port 3000)

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

- Sayt: http://localhost:3000

## Demo hisoblar

| Rol   | Login | Parol    |
|-------|-------|----------|
| Admin | admin | admin123 |
| User  | user  | user123  |

Admin bilan kirsangiz `/admin` paneli ochiladi.

## API endpointlar (asosiy)

- `GET /api/products` (`?category=`), `GET /api/products/:id`
- `POST /api/products`, `PATCH /api/products/:id`, `DELETE /api/products/:id`
- `POST /api/auth/login`, `POST /api/auth/register`
- `GET /api/banners`, `/api/categories`, `/api/brands`, `/api/daily-essentials`, `/api/nav-categories`, `/api/footer`
