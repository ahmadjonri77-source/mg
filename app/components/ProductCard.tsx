"use client";

import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@/lib/store";
import { formatINR } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const setOpen = useCart((s) => s.setOpen);

  const handleAdd = () => {
    addItem(product);
    setOpen(true);
  };

  return (
    <div className="group shrink-0 w-[180px] border border-slate-200 rounded-xl p-3 hover:shadow-md hover:border-blue-200 transition-all bg-white">
      <div className="relative">
        <span className="absolute top-0 right-0 bg-[var(--mm-blue)] text-white text-[11px] font-semibold rounded-md px-1.5 py-1 leading-none text-center">
          {product.discount}%<br />OFF
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-contain mx-auto"
        />
      </div>
      <h4 className="mt-3 text-sm font-medium text-slate-700 truncate">
        {product.name}
      </h4>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-bold text-slate-800">
          {formatINR(product.price)}
        </span>
        <span className="text-xs text-slate-400 line-through">
          {formatINR(product.oldPrice)}
        </span>
      </div>
      <p className="mt-1 text-xs font-semibold text-[var(--mm-green,#1d8a3b)] text-green-600">
        Save - {formatINR(product.save)}
      </p>
      <Button
        onClick={handleAdd}
        fullWidth
        size="small"
        variant="outlined"
        startIcon={<AddShoppingCartIcon sx={{ fontSize: 16 }} />}
        sx={{ mt: 1.5, textTransform: "none", fontSize: 12 }}
      >
        Add
      </Button>
    </div>
  );
}
