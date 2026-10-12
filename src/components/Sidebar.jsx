import {
  Activity,
  BarChart3,
  ChevronRight,
  Compass,
  Database,
  FileText,
  LayoutDashboard,
  Network,
  ShieldAlert,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    description: "Executive overview",
  },
  {
    label: "Graph Explorer",
    icon: Network,
    path: "/graph",
    description: "Explore relationships",
  },
  {
    label: "Risk Analysis",
    icon: ShieldAlert,
    path: "/risk",
    description: "Assess ecosystem risk",
  },
  {
    label: "Discovery",
    icon: Compass,
    path: "/discovery",
    description: "Find emerging signals",
  },
  {
    label: "Data Sources",
    icon: Database,
    path: "/sources",
    description: "Monitor intelligence sources",
  },
  {
    label: "Reports",
    icon: FileText,
    path: "/reports",
    description: "View intelligence reports",
  },
];

function NavigationLinks({ onNavigate }) {
  return (
    <div className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            title={item.description}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500/15 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-r-full bg-indigo-400" />
                )}

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "bg-white/[0.03] text-slate-500 group-hover:bg-white/[0.06] group-hover:text-slate-300"
                  }`}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.3 : 2} />
                </span>

                <span className="min-w-0 flex-1 truncate">
                  {item.label}
                </span>

                <ChevronRight
                  size={14}
                  className={`shrink-0 transition-all duration-200 ${
                    isActive
                      ? "translate-x-0 text-indigo-400 opacity-100"
                      : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
}

function SidebarContent({ onNavigate }) {
  return (
    <>
      {/* Workspace header */}
      <div className="border-b border-slate-800/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
            <Activity size={17} strokeWidth={2.3} />

            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Workspace
            </p>

            <h2 className="mt-0.5 truncate text-sm font-bold text-white">
              Intelligence Hub
            </h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          Intelligence
        </p>

        <NavigationLinks onNavigate={onNavigate} />

        <div className="my-6 border-t border-slate-800/80" />

        {/* System */}
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          System
        </p>

        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/60 p-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-xs font-semibold text-slate-200">
              System Online
            </span>

            <span className="ml-auto rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
              Live
            </span>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-slate-500">
            Intelligence services are operational and monitoring active
            ecosystems.
          </p>
        </div>

        {/* System metrics */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-3 transition hover:border-indigo-500/20 hover:bg-slate-900">
            <div className="flex items-center justify-between">
              <BarChart3 size={15} className="text-indigo-400" />

              <span className="text-[9px] font-bold text-emerald-400">
                +2.4%
              </span>
            </div>

            <p className="mt-3 text-sm font-bold text-white">98.4%</p>

            <p className="mt-0.5 text-[10px] text-slate-500">Coverage</p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-3 transition hover:border-cyan-500/20 hover:bg-slate-900">
            <div className="flex items-center justify-between">
              <Network size={15} className="text-cyan-400" />

              <span className="text-[9px] font-bold text-emerald-400">
                +8.2%
              </span>
            </div>

            <p className="mt-3 text-sm font-bold text-white">1.2K</p>

            <p className="mt-0.5 text-[10px] text-slate-500">Networks</p>
          </div>
        </div>

        {/* Console status */}
        <div className="mt-3 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
              Console
            </span>

            <span className="text-[10px] font-semibold text-slate-500">
              v1.0
            </span>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[84%] rounded-full bg-indigo-500" />
          </div>

          <p className="mt-2 text-[10px] text-slate-600">
            Intelligence engine ready
          </p>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800/80 p-4">
        <div className="rounded-xl bg-slate-900/40 px-3 py-2.5">
          <p className="text-[10px] font-semibold text-slate-500">
            NEXUS Digital Intelligence
          </p>

          <p className="mt-0.5 text-[10px] text-slate-700">
            Frontend Intelligence Console
          </p>
        </div>
      </div>
    </>
  );
}

function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-slate-800/80 bg-slate-950 text-slate-300 lg:flex lg:min-h-[calc(100vh-72px)] lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-[60] flex w-[290px] max-w-[88vw] flex-col bg-slate-950 text-slate-300 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-800/80 px-4">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <Activity size={17} />

              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">NEXUS</p>

              <p className="text-[10px] text-slate-500">
                Intelligence Hub
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  );
}

export default Sidebar;