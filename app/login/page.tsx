"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login as loginRequest } from "@/lib/api";
import { saveUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!login || !password) {
      setError("Login va parolni kiriting.");
      return;
    }
    setLoading(true);
    try {
      const user = await loginRequest(login, password);
      saveUser(user);
      // Admin bo'lsa admin panelga, aks holda bosh sahifaga.
      router.push(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kirishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <Link
          href="/"
          className="block text-center text-2xl font-extrabold text-[var(--mm-blue)] mb-1"
        >
          MegaMart
        </Link>
        <h1 className="text-center text-xl font-semibold text-slate-800 mb-1">
          Tizimga kirish
        </h1>
        <p className="text-center text-sm text-slate-500 mb-6">
          Login va parolingiz bilan kiring
        </p>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            label="Parol"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      aria-label="Toggle password"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 20 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ textTransform: "none", fontWeight: 600, py: 1.2 }}
          >
            {loading ? "Kirilmoqda…" : "Kirish"}
          </Button>
        </form>

        <div className="mt-4 rounded-lg bg-slate-50 border border-slate-100 p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-600 mb-1">Demo hisoblar:</p>
          <p>Admin — login: <b>admin</b>, parol: <b>admin123</b></p>
          <p>User — login: <b>user</b>, parol: <b>user123</b></p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Hisobingiz yo&apos;qmi?{" "}
          <Link
            href="/register"
            className="text-[var(--mm-blue)] font-semibold hover:underline"
          >
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </p>
      </div>
    </main>
  );
}
