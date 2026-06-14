import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NavBar({ categories }: { categories: string[] }) {
  return (
    <nav className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto mm-scroll">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors ${
              i === 0
                ? "bg-blue-50 border-blue-200 text-[var(--mm-blue)] font-semibold"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
            <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
          </button>
        ))}
      </div>
    </nav>
  );
}
