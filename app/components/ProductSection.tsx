import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductSection({
  prefix,
  highlight,
  products,
}: {
  prefix: string;
  highlight: string;
  products: Product[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <SectionHeader prefix={prefix} highlight={highlight} />
      <div className="flex gap-4 overflow-x-auto mm-scroll pb-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
