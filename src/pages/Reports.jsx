import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileBarChart,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Panel from "../components/Panel";
import { useTheme } from "../context/ThemeContext";

import {
  reportActivity,
  reportInsights,
  reportOverview,
  reportTypes,
  reports,
} from "../data/reportData";

const statusStyles = {
  Ready: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60",
    dot: "bg-emerald-500",
  },
  Processing: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
    dot: "bg-amber-500",
  },
  Archived: {
    badge:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
    dot: "bg-slate-400",
  },
};

function Reports() {
  const { theme } = useTheme();

  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesType =
        activeType === "All" || report.type === activeType;

      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.status.toLowerCase().includes(query) ||
        report.coverage.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [search, activeType]);

  const clearFilters = () => {
    setSearch("");
    setActiveType("All");
    setShowFilters(false);
  };

  const chartGrid = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const chartXAxis = theme === "dark" ? "#cbd5e1" : "#64748b";
  const chartYAxis = theme === "dark" ? "#94a3b8" : "#94a3b8";
  const chartCursor =
    theme === "dark"
      ? "rgba(129, 140, 248, 0.08)"
      : "rgba(99, 102, 241, 0.05)";

  const tooltipStyles =
    theme === "dark"
      ? {
          borderRadius: "12px",
          border: "1px solid #334155",
          backgroundColor: "#0f172a",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
          color: "#e2e8f0",
          fontSize: "12px",
        }
      : {
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
          color: "#0f172a",
          fontSize: "12px",
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
              <FileText size={13} />
              Intelligence Reports
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Reports & Intelligence
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Generate, review and organize structured intelligence reports
              covering digital ecosystems, networks, discovery and risk.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
                <BarChart3 size={18} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Report Engine
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-sm font-bold text-white">
                    Operational
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <Plus size={16} />
              Create Report
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Reports",
            value: reportOverview.totalReports,
            icon: FileText,
            style:
              "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
          },
          {
            label: "Generated",
            value: reportOverview.generatedReports,
            icon: CheckCircle2,
            style:
              "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
          },
          {
            label: "Scheduled",
            value: reportOverview.scheduledReports,
            icon: CalendarDays,
            style:
              "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400",
          },
          {
            label: "Latest Report",
            value: reportOverview.latestReport,
            icon: Clock3,
            style:
              "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.style}`}
                >
                  <Icon size={19} />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>

              <strong
                className={`mt-1 block font-extrabold tracking-tight text-slate-950 dark:text-white ${
                  item.label === "Latest Report"
                    ? "text-xl"
                    : "text-3xl"
                }`}
              >
                {item.value}
              </strong>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-2/3 rounded-full bg-indigo-500 transition-all duration-500 group-hover:w-4/5" />
              </div>
            </article>
          );
        })}
      </section>

      {/* =========================================================
          ACTIVITY + REPORT TYPES
      ========================================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Panel
          title="Report Activity"
          subtitle="Generated intelligence reports over the recent monitoring cycle"
          icon={BarChart3}
          action={
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              Recent Activity
            </span>
          }
        >
          <div className="h-[290px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportActivity}
                margin={{
                  top: 10,
                  right: 5,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke={chartGrid}
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: chartXAxis,
                    fontSize: 11,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: chartYAxis,
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: chartCursor,
                  }}
                  contentStyle={tooltipStyles}
                />

                <Bar
                  dataKey="reports"
                  name="Reports"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  barSize={34}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Report Types"
          subtitle="Distribution across intelligence categories"
          icon={FileBarChart}
        >
          <div className="space-y-5">
            {reportTypes.map((type) => {
              const percentage = Math.round(
                (type.count / reportOverview.totalReports) * 100
              );

              return (
                <div key={type.name}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {type.name}
                    </span>

                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {type.count} · {percentage}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                <FileBarChart size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  Report Coverage
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-slate-500 dark:text-slate-400">
                  Reports cover risk, network, discovery and ecosystem
                  intelligence.
                </p>
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* =========================================================
          REPORT LIST
      ========================================================== */}
      <Panel
        title="Intelligence Reports"
        subtitle={`${filteredReports.length} reports available`}
        icon={FileText}
        action={
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950 sm:flex">
              <Search size={14} className="text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports..."
                className="w-40 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
                aria-label="Search reports"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="Clear report search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                showFilters
                  ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400"
                  : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
              }`}
              aria-label="Toggle report filters"
              aria-pressed={showFilters}
            >
              <Filter size={15} />
            </button>
          </div>
        }
      >
        {/* Mobile search */}
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950 sm:hidden">
          <Search size={14} className="text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reports..."
            className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
            aria-label="Search reports"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Clear report search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showFilters
              ? "mb-5 max-h-40 opacity-100"
              : "mb-0 max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/30">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                Filter by type
              </span>

              {["All", ...reportTypes.map((type) => type.name)].map(
                (type) => {
                  const active = activeType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveType(type)}
                      aria-pressed={active}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        active
                          ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                          : "bg-white text-slate-500 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400"
                      }`}
                    >
                      {type}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {["All", ...reportTypes.map((type) => type.name)].map(
            (type) => {
              const active = activeType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  aria-pressed={active}
                  className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                  }`}
                >
                  {type}
                </button>
              );
            }
          )}

          {(search || activeType !== "All") && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X size={13} />
              Clear
            </button>
          )}
        </div>

        {/* Report cards */}
        {filteredReports.length > 0 ? (
          <div className="space-y-3">
            {filteredReports.map((report) => {
              const status =
                statusStyles[report.status] ||
                statusStyles.Archived;

              return (
                <article
                  key={report.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-slate-50/60 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-900/60 dark:hover:bg-slate-800/70 dark:hover:shadow-black/20"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/50 dark:text-indigo-400">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {report.title}
                          </h3>

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${status.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                            />
                            {report.status}
                          </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-400">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.coverage}</span>
                          <span>•</span>
                          <span>{report.pages} pages</span>
                          <span>•</span>
                          <span>{report.updatedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-5 lg:shrink-0 lg:justify-end">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          Intelligence Score
                        </p>

                        <div className="mt-1 flex items-center gap-2 sm:justify-end">
                          <strong className="text-lg font-extrabold text-slate-900 dark:text-white">
                            {report.score}
                          </strong>

                          <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:block">
                            <div
                              className="h-full rounded-full bg-indigo-500"
                              style={{
                                width: `${Math.min(
                                  Number(report.score) || 0,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                          aria-label={`Download ${report.title}`}
                        >
                          <Download size={15} />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                          aria-label={`More options for ${report.title}`}
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm dark:bg-slate-900">
              <Search size={19} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-200">
              No reports found
            </h3>

            <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 dark:text-slate-400">
              Try another search term or report category.
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
          INSIGHTS
      ========================================================== */}
      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Panel
          title="Report Intelligence"
          subtitle="Automated report-generation insights"
          icon={Sparkles}
        >
          <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 text-white">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <TrendingUp size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Report Generation
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    Activity is trending upward
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <strong className="text-4xl font-extrabold">
                  +24%
                </strong>

                <span className="mb-1 text-xs text-slate-500">
                  compared with previous cycle
                </span>
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-indigo-500" />
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Latest Intelligence Insights"
          subtitle="Key observations extracted from recent reports"
          icon={Sparkles}
        >
          <div className="grid gap-3 md:grid-cols-2">
            {reportInsights.map((insight, index) => (
              <div
                key={insight}
                className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-900/60 dark:hover:bg-slate-900"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[10px] font-extrabold text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-950/50 dark:text-indigo-400">
                  {index + 1}
                </div>

                <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

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
              Report intelligence engine operational
            </p>

            <p className="text-[11px] text-slate-400">
              Frontend intelligence simulation · No external API
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-400">
          NEXUS Report Intelligence
        </span>
      </div>
    </section>
  );
}

export default Reports;