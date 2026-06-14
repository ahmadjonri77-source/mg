import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SectionHeader({
  prefix,
  highlight,
}: {
  prefix: string;
  highlight: string;
}) {
  return (
    <div className="flex items-end justify-between border-b border-slate-200 pb-2 mb-5">
      <h3 className="text-lg font-semibold text-slate-700">
        {prefix} <span className="text-[var(--mm-blue)]">{highlight}</span>
      </h3>
      <a
        href="#"
        className="flex items-center text-sm text-slate-500 hover:text-[var(--mm-blue)]"
      >
        View All <ChevronRightIcon sx={{ fontSize: 18 }} />
      </a>
    </div>
  );
}
