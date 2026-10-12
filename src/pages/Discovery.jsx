import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Filter,
  Flame,
  Globe2,
  Layers3,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import Panel from "../components/Panel";
import { useTheme } from "../context/ThemeContext";

import {
  discoveryCategories,
  discoveryOverview,
  discoverySignals,
  trendingNetworks,
} from "../data/discoveryData";

const impactStyles = {
  High: {
    badge:
      "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
    icon:
      "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  },
  Medium: {
    badge:
      "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50",
    icon:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  },
  Low: {
    badge:
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50",
    icon:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
};

const statusStyles = {
  Emerging:
    "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  Growing:
    "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
  Monitoring:
    "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  Early:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

const categoryIcons = {
  Community: Users,
  Network: Globe2,
  Behavior: Compass,
  Information: Sparkles,
  Platform: Layers3,
};

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  iconStyle,
}) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={19} />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <strong className="mt-1 block text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
        {value}
      </strong>

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="h-full w-2/3 rounded-full bg-indigo-500 transition-all duration-500 group-hover:w-4/5" />
      </div>
    </article>
  );
}

function SignalCard({ signal }) {
  const impact =
    impactStyles[signal.impact] || impactStyles.Medium;

  const Icon = categoryIcons[signal.category] || Sparkles;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-black/20">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-200 ${impact.icon} group-hover:bg-indigo-600 group-hover:text-white`}
        >
          <Icon size={17} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="min-w-0 text-sm font-bold text-slate-900 dark:text-slate-100">
              {signal.title}
            </h3>

            <span
              className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${impact.badge}`}
            >
              {signal.impact}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            {signal.category} · {signal.source}
          </p>

          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Detected {signal.detected}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-lg px-2 py-1 text-[10px] font-bold ${
                statusStyles[signal.status] || statusStyles.Early
              }`}
            >
              {signal.status}
            </span>

            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <TrendingUp size={11} />
              {signal.growth}
            </span>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Signal Score
              </span>

              <strong className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {signal.score}
              </strong>
            </div>

            <div
              className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              aria-label={`Signal score ${signal.score}`}
            >
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                style={{
                  width: `${signal.score}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Discovery() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...discoveryCategories.map((category) => category.name),
  ];

  const filteredSignals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return discoverySignals.filter((signal) => {
      const matchesSearch =
        !query ||
        signal.title.toLowerCase().includes(query) ||
        signal.category.toLowerCase().includes(query) ||
        signal.source.toLowerCase().includes(query) ||
        signal.status.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        signal.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <section className="space-y-6">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-7 text-white shadow-xl dark:shadow-black/30 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
              <Compass size={13} />
              Discovery Intelligence
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Discover emerging digital patterns.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Identify emerging communities, unusual behaviors, information
              flows and fast-growing digital networks before they become major
              ecosystem signals.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
              <span className="absolute inset-0 animate-ping rounded-xl bg-indigo-400/20" />
              <Flame size={20} className="relative" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Discovery Engine
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>

                <span className="text-sm font-bold text-white">
                  Scanning Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Sparkles}
          label="Emerging Signals"
          value={discoveryOverview.emergingSignals}
          description="New intelligence signals identified"
          iconStyle="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
        />

        <MetricCard
          icon={Users}
          label="New Communities"
          value={discoveryOverview.newCommunities}
          description="Recently detected communities"
          iconStyle="bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400"
        />

        <MetricCard
          icon={Flame}
          label="Unusual Patterns"
          value={discoveryOverview.unusualPatterns}
          description="Patterns requiring investigation"
          iconStyle="bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
        />

        <MetricCard
          icon={TrendingUp}
          label="Growth Rate"
          value={discoveryOverview.growthRate}
          description="Average discovery growth"
          iconStyle="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
      </section>

      {/* =========================================================
          SIGNAL OVERVIEW + CATEGORIES
      ========================================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Panel
          title="Emerging Signal Overview"
          subtitle="Latest patterns detected by the discovery engine"
          icon={Sparkles}
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {discoverySignals.slice(0, 6).map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </Panel>

        <Panel
          title="Discovery Categories"
          subtitle="Distribution of newly detected signals"
          icon={Layers3}
        >
          <div className="space-y-5">
            {discoveryCategories.map((category) => {
              const Icon =
                categoryIcons[category.name] || Layers3;

              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {category.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {category.count} signals
                        </p>
                      </div>
                    </div>

                    <strong className="shrink-0 text-sm font-bold text-slate-900 dark:text-slate-100">
                      {category.percentage}%
                    </strong>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{
                        width: `${category.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                <Zap size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  Discovery Insight
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Community and information signals currently represent a
                  significant share of emerging ecosystem activity.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* =========================================================
          SEARCH + FILTERS
      ========================================================== */}
      <Panel
        title="Discovery Intelligence"
        subtitle="Search and filter the current intelligence layer"
        icon={Search}
        action={
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            {filteredSignals.length} Results
          </span>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:border-indigo-700 dark:focus-within:bg-slate-900">
            <Search
              size={16}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search signals, categories, sources..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
              aria-label="Search discovery signals"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 active:scale-95 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500">
              <Filter size={15} />
            </div>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                  activeCategory === category
                    ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {(search || activeCategory !== "All") && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-3.5 py-2.5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <p className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400">
                Showing {filteredSignals.length} matching signals
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <X size={12} />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </Panel>

      {/* =========================================================
          FILTERED SIGNALS
      ========================================================== */}
      <Panel
        title="Signal Results"
        subtitle="Signals matching the current discovery filters"
        icon={Flame}
      >
        {filteredSignals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900 dark:text-slate-500">
              <Search size={20} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-200">
              No signals found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
              Try another search term or select a different category.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Reset filters
            </button>
          </div>
        )}
      </Panel>

      {/* =========================================================
          TRENDING NETWORKS
      ========================================================== */}
      <Panel
        title="Trending Networks"
        subtitle="Fast-growing digital networks and emerging clusters"
        icon={Flame}
        action={
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            Explore
            <ArrowUpRight size={13} />
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {trendingNetworks.map((network, index) => (
            <div
              key={network.name}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-900/60 dark:hover:bg-slate-900 dark:hover:shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/50 dark:text-indigo-400">
                    <span className="text-sm font-extrabold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                      {network.name}
                    </h3>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {network.connections.toLocaleString()} connections
                    </p>
                  </div>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <TrendingUp size={10} />
                  {network.growth}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Momentum
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                    {network.momentum}
                  </p>
                </div>

                <div className="flex h-10 items-end gap-1">
                  {[28, 42, 35, 58, 47, 74, 64, 88].map(
                    (height, barIndex) => (
                      <span
                        key={barIndex}
                        className="w-1.5 rounded-full bg-indigo-200 transition-all duration-300 group-hover:bg-indigo-400 dark:bg-indigo-900 dark:group-hover:bg-indigo-500"
                        style={{
                          height: `${height * 0.45}px`,
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* =========================================================
          FOOTER STATUS
      ========================================================== */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Discovery engine operational
            </p>

            <p className="text-[11px] text-slate-400">
              Frontend intelligence simulation · No external API
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          NEXUS Discovery Intelligence
        </span>
      </div>
    </section>
  );
}

export default Discovery;