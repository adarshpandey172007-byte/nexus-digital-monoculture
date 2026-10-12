import { ArrowDownRight, ArrowUpRight } from "lucide-react";

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  description,
  trend = "up",
  iconStyle = "indigo",
}) {
  const isPositive = trend === "up";

  const iconStyles = {
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    red:
      "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    cyan:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400",
  };

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-slate-950/30">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            iconStyles[iconStyle] || iconStyles.indigo
          }`}
        >
          {Icon && <Icon size={19} strokeWidth={2.2} />}
        </div>

        {change && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
              isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}

            {change}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <strong className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            {value}
          </strong>
        </div>

        {description && (
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full w-2/3 rounded-full transition-all duration-500 group-hover:w-4/5 ${
            iconStyle === "red"
              ? "bg-red-500"
              : iconStyle === "amber"
                ? "bg-amber-500"
                : iconStyle === "emerald"
                  ? "bg-emerald-500"
                  : "bg-indigo-500"
          }`}
        />
      </div>
    </article>
  );
}

export default StatCard;