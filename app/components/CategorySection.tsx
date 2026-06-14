import SectionHeader from "./SectionHeader";
import type { Category } from "@/lib/types";

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader prefix="Shop From" highlight="Top Categories" />
      <div className="flex gap-6 overflow-x-auto mm-scroll pb-2">
        {categories.map((c, i) => (
          <button
            key={c.id}
            className="shrink-0 flex flex-col items-center gap-2 w-24 group"
          >
            <div
              className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                i === 0 ? "border-[var(--mm-blue)]" : "border-transparent"
              } group-hover:border-blue-200 transition-colors`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-slate-600">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
