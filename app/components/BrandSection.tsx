import SectionHeader from "./SectionHeader";
import type { Brand } from "@/lib/types";

export default function BrandSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader prefix="Top" highlight="Electronics Brands" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {brands.map((b) => (
          <div
            key={b.id}
            className="rounded-xl overflow-hidden flex items-center justify-between px-6 py-6"
            style={{ backgroundColor: b.bg, color: b.color }}
          >
            <div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{
                  backgroundColor:
                    b.color === "#ffffff"
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,0,0,0.08)",
                }}
              >
                {b.name}
              </span>
              <p className="mt-3 text-2xl font-extrabold">{b.title}</p>
              <p className="mt-1 text-sm font-semibold opacity-90">
                {b.subtitle}
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.image}
              alt={b.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
