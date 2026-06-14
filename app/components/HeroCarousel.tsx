"use client";

import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { Banner } from "@/lib/types";

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const go = (n: number) => setIndex((prev) => (prev + n + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;
  const banner = banners[index];

  return (
    <div
      className="relative rounded-2xl overflow-hidden text-white h-[280px] md:h-[320px]"
      style={{
        background: `radial-gradient(120% 120% at 0% 0%, ${banner.bg} 40%, rgba(0,0,0,0.3) 100%)`,
      }}
    >
      {/* Background image fills the right half, faded into the bg color */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${banner.bg} 0%, ${banner.bg}cc 25%, transparent 70%)`,
          }}
        />
      </div>

      {/* Text content */}
      <div className="relative h-full flex flex-col justify-center max-w-md px-8 md:px-14">
        <p className="text-sm text-white/70 mb-3">{banner.eyebrow}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
          {banner.title}
        </h2>
        <p className="mt-4 text-base md:text-lg font-semibold text-white/90">
          {banner.subtitle}
        </p>
        <div>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#fff",
              color: banner.bg,
              fontWeight: 700,
              textTransform: "none",
              px: 3,
              borderRadius: 2,
              "&:hover": { bgcolor: "#f1f5f9" },
            }}
          >
            Shop Now
          </Button>
        </div>
      </div>

      <IconButton
        onClick={() => go(-1)}
        aria-label="Previous slide"
        size="small"
        sx={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.2)",
          color: "#fff",
          backdropFilter: "blur(4px)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
        }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => go(1)}
        aria-label="Next slide"
        size="small"
        sx={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.2)",
          color: "#fff",
          backdropFilter: "blur(4px)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      <div className="absolute bottom-5 left-8 md:left-14 flex gap-2">
        {banners.map((b, i) => (
          <button
            key={b.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-white" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
