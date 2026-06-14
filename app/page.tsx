import HomeClient from "./HomeClient";

// Bosh sahifa client-rendered: ma'lumotni brauzer API'dan oladi.
// Shu sabab Vercel serverida fetch bo'lmaydi (500 chiqmaydi) — sayt sizning
// kompyuteringizdagi backend (localhost:4000) ga brauzer orqali ulanadi.
export default function Home() {
  return <HomeClient />;
}
