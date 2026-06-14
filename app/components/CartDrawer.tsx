"use client";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "@/lib/store";
import { formatINR } from "@/lib/format";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, open, setOpen, increment, decrement, removeItem, clear } =
    useCart();
  const totalPrice = useCart((s) => s.totalPrice);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="w-[360px] max-w-[90vw] flex flex-col h-full">
        <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} /> Your Cart
          </h3>
          <IconButton onClick={() => setOpen(false)} aria-label="Close cart">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {!mounted || items.length === 0 ? (
            <p className="text-center text-slate-400 mt-16 text-sm">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-md border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {formatINR(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <IconButton
                      size="small"
                      onClick={() => decrement(item.id)}
                      sx={{ border: "1px solid #e2e8f0" }}
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <span className="text-sm w-5 text-center">{item.qty}</span>
                    <IconButton
                      size="small"
                      onClick={() => increment(item.id)}
                      sx={{ border: "1px solid #e2e8f0" }}
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </div>
                </div>
                <IconButton
                  size="small"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <DeleteOutlineIcon sx={{ fontSize: 18, color: "#ef4444" }} />
                </IconButton>
              </div>
            ))
          )}
        </div>

        {mounted && items.length > 0 && (
          <div className="border-t border-slate-100 px-4 py-4">
            <Divider sx={{ mb: 2 }} />
            <div className="flex justify-between mb-3">
              <span className="text-slate-500">Total</span>
              <span className="font-bold text-slate-800">
                {formatINR(totalPrice())}
              </span>
            </div>
            <Button
              fullWidth
              variant="contained"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Checkout
            </Button>
            <Button
              fullWidth
              onClick={clear}
              sx={{ textTransform: "none", mt: 1, color: "#64748b" }}
            >
              Clear cart
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
