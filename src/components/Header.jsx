import { Activity, Bell, Search, Sparkles } from "lucide-react";

function Header() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="flex min-h-[88px] items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
            <Activity size={19} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-950">
                NEXUS Dashboard
              </h1>

              <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:inline-flex">
                Live
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Digital Monoculture Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 md:flex"
          >
            <Search size={16} />
            Search
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
          </button>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Sparkles size={16} />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;