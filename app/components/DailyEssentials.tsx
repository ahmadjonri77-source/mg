import SectionHeader from "./SectionHeader";
import type { DailyEssential } from "@/lib/types";

export default function DailyEssentials({
  items,
}: {
  items: DailyEssential[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader prefix="Daily" highlight="Essentials" />
      <div className="flex gap-4 overflow-x-auto mm-scroll pb-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="shrink-0 w-32 flex flex-col items-center text-center"
          >
            <div
              className={`w-28 h-28 rounded-xl overflow-hidden border ${
                i === 0 ? "border-blue-200" : "border-slate-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 text-sm text-slate-600">{item.name}</span>
            <span className="text-xs font-bold text-slate-800">
              {item.subtitle}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
