"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import type { Product, ProductInput } from "@/lib/types";

interface Props {
  open: boolean;
  product: Product | null; // null => create mode
  onClose: () => void;
  onSubmit: (input: ProductInput) => Promise<void>;
}

const empty = {
  name: "",
  category: "Smartphones",
  price: "",
  oldPrice: "",
  discount: "",
  save: "",
  image: "",
};

export default function ProductDialog({
  open,
  product,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Kompyuterdan tanlangan rasmni base64 (data URL) ga aylantirib saqlaymiz.
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Faqat rasm fayli tanlang.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Rasm hajmi 5MB dan oshmasligi kerak.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, image: String(reader.result) }));
      setError("");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        category: product.category,
        price: String(product.price),
        oldPrice: String(product.oldPrice),
        discount: String(product.discount),
        save: String(product.save),
        image: product.image,
      });
    } else {
      setForm(empty);
    }
    setError("");
  }, [product, open]);

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    setError("");
    if (!form.name || !form.price) {
      setError("Nomi va narxi majburiy.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        name: form.name,
        category: form.category || "Smartphones",
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : Number(form.price),
        discount: form.discount ? Number(form.discount) : 0,
        save: form.save ? Number(form.save) : 0,
        image: form.image || undefined,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {product ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <TextField
            label="Nomi"
            value={form.name}
            onChange={set("name")}
            fullWidth
            className="sm:col-span-2"
          />
          <TextField
            label="Kategoriya"
            value={form.category}
            onChange={set("category")}
            fullWidth
          />
          <TextField
            label="Narx (₹)"
            type="number"
            value={form.price}
            onChange={set("price")}
            fullWidth
          />
          <TextField
            label="Eski narx (₹)"
            type="number"
            value={form.oldPrice}
            onChange={set("oldPrice")}
            fullWidth
          />
          <TextField
            label="Chegirma (%)"
            type="number"
            value={form.discount}
            onChange={set("discount")}
            fullWidth
          />
          <TextField
            label="Tejaladi (₹)"
            type="number"
            value={form.save}
            onChange={set("save")}
            fullWidth
          />
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-slate-600 mb-2">Rasm</p>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 shrink-0 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                {form.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                    <IconButton
                      size="small"
                      onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        bgcolor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                      }}
                      aria-label="Rasmni o'chirish"
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 text-center px-1">
                    Rasm yo&apos;q
                  </span>
                )}
              </div>

              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFile}
                />
                <Button
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  onClick={() => fileRef.current?.click()}
                  sx={{ textTransform: "none" }}
                >
                  Kompyuterdan tanlash
                </Button>
                <p className="text-xs text-slate-400 mt-1">
                  PNG/JPG, 5MB gacha. Yoki pastga URL qo&apos;ying.
                </p>
              </div>
            </div>

            <TextField
              label="Rasm URL (ixtiyoriy)"
              value={form.image.startsWith("data:") ? "" : form.image}
              onChange={set("image")}
              placeholder={
                form.image.startsWith("data:")
                  ? "Yuklangan rasm tanlandi"
                  : "https://…"
              }
              fullWidth
              sx={{ mt: 2 }}
              disabled={form.image.startsWith("data:")}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Bekor qilish
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {saving ? "Saqlanmoqda…" : "Saqlash"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
