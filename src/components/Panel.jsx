function Panel({
  title,
  subtitle,
  action,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Icon size={17} />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>

            {subtitle && (
              <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default Panel;