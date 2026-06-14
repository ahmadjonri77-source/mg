"use client";

import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { clearUser, getUser } from "@/lib/auth";
import type { AuthUser } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Header() {
  const setOpen = useCart((s) => s.setOpen);
  const totalCount = useCart((s) => s.totalCount);
  // Avoid hydration mismatch: cart is persisted to localStorage.
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    setMounted(true);
    setUser(getUser());
  }, []);
  const count = mounted ? totalCount() : 0;

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-extrabold text-[var(--mm-blue)] tracking-tight">
            <span className="inline-block mr-1 align-middle">≡</span>MegaMart
          </span>
        </a>

        <div className="flex-1 max-w-xl mx-auto">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 h-10">
            <SearchIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
            <InputBase
              placeholder="Search essentials, groceries and more…"
              sx={{ ml: 1, flex: 1, fontSize: 14 }}
            />
            <TuneIcon sx={{ fontSize: 20, color: "#94a3b8" }} />
          </div>
        </div>

        {mounted && user ? (
          <div className="hidden sm:flex items-center gap-1">
            {user.role === "admin" && (
              <Button
                component={Link}
                href="/admin"
                sx={{ color: "#1f63d2", textTransform: "none", fontWeight: 600 }}
              >
                Admin panel
              </Button>
            )}
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              {user.name || user.login}
            </span>
            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
              sx={{ color: "#64748b", textTransform: "none", fontWeight: 600 }}
            >
              Chiqish
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            href="/login"
            startIcon={<PersonOutlineIcon />}
            sx={{ color: "#334155", textTransform: "none", fontWeight: 600 }}
            className="hidden! sm:inline-flex!"
          >
            Sign Up/Sign In
          </Button>
        )}

        <IconButton onClick={() => setOpen(true)} aria-label="Open cart">
          <Badge badgeContent={count} color="primary">
            <ShoppingCartOutlinedIcon sx={{ color: "#334155" }} />
          </Badge>
          <span className="ml-2 text-sm font-semibold text-slate-700 hidden sm:inline">
            Cart
          </span>
        </IconButton>
      </div>
    </header>
  );
}
