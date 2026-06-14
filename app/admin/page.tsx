"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/api";
import { clearUser, getUser } from "@/lib/auth";
import { formatINR } from "@/lib/format";
import type { Product, ProductInput } from "@/lib/types";
import ProductDialog from "./ProductDialog";

export default function AdminPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [toast, setToast] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(await getProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  // Faqat admin kira oladi.
  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") {
      router.replace("/login");
      return;
    }
    setAuthChecked(true);
    load();
  }, [router, load]);

  const handleCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const handleEdit = (p: Product) => {
    setEditing(p);
    setDialogOpen(true);
  };

  const handleSubmit = async (input: ProductInput) => {
    if (editing) {
      await updateProduct(editing.id, input);
      setToast("Mahsulot yangilandi");
    } else {
      await createProduct(input);
      setToast("Mahsulot qo'shildi");
    }
    await load();
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await deleteProduct(toDelete.id);
    setToast("Mahsulot o'chirildi");
    setToDelete(null);
    await load();
  };

  const handleLogout = () => {
    clearUser();
    router.push("/login");
  };

  if (!authChecked) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <CircularProgress />
      </main>
    );
  }

  return (
    <main className="flex-1 bg-slate-50 min-h-screen">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inventory2OutlinedIcon sx={{ color: "#1f63d2" }} />
            <h1 className="text-lg font-bold text-slate-800">
              MegaMart <span className="text-[var(--mm-blue)]">Admin</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              component={Link}
              href="/"
              sx={{ textTransform: "none", color: "#475569" }}
            >
              Saytga qaytish
            </Button>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
              sx={{ textTransform: "none", color: "#64748b" }}
            >
              Chiqish
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Mahsulotlar
            </h2>
            <p className="text-sm text-slate-500">
              Jami: {products.length} ta mahsulot
            </p>
          </div>
          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Yangi mahsulot
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Rasm</TableCell>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Kategoriya</TableCell>
                  <TableCell align="right">Narx</TableCell>
                  <TableCell align="right">Chegirma</TableCell>
                  <TableCell align="center">Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-contain rounded border border-slate-100"
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell align="right">{formatINR(p.price)}</TableCell>
                    <TableCell align="right">{p.discount}%</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(p)}
                        aria-label="Edit"
                      >
                        <EditOutlinedIcon
                          sx={{ fontSize: 20, color: "#1f63d2" }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setToDelete(p)}
                        aria-label="Delete"
                      >
                        <DeleteOutlinedIcon
                          sx={{ fontSize: 20, color: "#ef4444" }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <span className="text-slate-400">
                        Mahsulot yo&apos;q. &quot;Yangi mahsulot&quot; tugmasini
                        bosing.
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <ProductDialog
        open={dialogOpen}
        product={editing}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />

      <Dialog open={!!toDelete} onClose={() => setToDelete(null)}>
        <DialogTitle>O&apos;chirishni tasdiqlang</DialogTitle>
        <DialogContent>
          <p className="text-slate-600">
            <b>{toDelete?.name}</b> mahsulotini o&apos;chirmoqchimisiz?
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setToDelete(null)}
            sx={{ textTransform: "none" }}
          >
            Bekor qilish
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            O&apos;chirish
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setToast("")}>
          {toast}
        </Alert>
      </Snackbar>
    </main>
  );
}
