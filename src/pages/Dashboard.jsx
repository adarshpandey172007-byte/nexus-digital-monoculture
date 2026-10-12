import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Globe2,
  Network,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Panel from "../components/Panel";
import StatCard from "../components/StatCard";
import { useTheme } from "../context/ThemeContext";

import {
  dashboardInsight,
  dashboardMetrics,
  intelligenceEvents,
  platformRisk,
  riskDistribution,
  signalActivity,
} from "../data/dashboardData";

const riskColors = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#22c55e",
};

const signalIcons = {
  Risk: ShieldAlert,
  Discovery: Sparkles,
  Network,
  Intelligence: Activity,
};

const signalStyles = {
  high: {
    icon: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
    badge: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    label: "High",
  },
  medium: {
    icon: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
    badge:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    label: "Medium",
  },
  low: {
    icon:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    label: "Low",
  },
};

function Dashboard() {
  const { theme } = useTheme();

  const digitalSignals = dashboardMetrics.find(
    (item) => item.label === "Digital Signals"
  );

  const activeNetworks = dashboardMetrics.find(
    (item) => item.label === "Active Networks"
  );

  const communities = dashboardMetrics.find(
    (item) => item.label === "Communities"
  );

  const riskExposure = dashboardMetrics.find(
    (item) => item.label === "Risk Exposure"
  );

  const metricCards = [
    {
      ...digitalSignals,
      icon: Activity,
    },
    {
      ...activeNetworks,
      icon: Network,
    },
    {
      ...communities,
      icon: Users,
    },
    {
      ...riskExposure,
      icon: ShieldAlert,
    },
  ];

  const chartGrid = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const chartText = theme === "dark" ? "#94a3b8" : "#94a3b8";
  const chartAxisText = theme === "dark" ? "#cbd5e1" : "#475569";
  const chartCursor = theme === "dark" ? "#1e293b" : "#f8fafc";
  const tooltipBackground = theme === "dark" ? "#0f172a" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "#334155" : "#e2e8f0";
  const tooltipText = theme === "dark" ? "#e2e8f0" : "#0f172a";

  return (
    <div className="space-y-6">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8 lg:p-9">
        <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_35%)]" />

        <div className="relative flex flex-col justify-between gap-8 xl:flex-row xl:items-center">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
              <Sparkles size={13} />
              NEXUS Intelligence Console
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Digital ecosystem intelligence
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Monitor platform dependencies, network relationships, emerging
              signals and digital monoculture risk from one intelligence
              workspace.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Intelligence systems operational
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">
                <Activity size={13} />
                Live monitoring
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">
                <Globe2 size={13} />
                Global coverage
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[430px]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl transition hover:bg-white/[0.09]">
              <Network size={17} className="text-indigo-300" />

              <strong className="mt-3 block text-2xl font-extrabold">
                {activeNetworks?.value ?? "—"}
              </strong>

              <span className="mt-1 block text-[10px] text-slate-500">
                Networks
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl transition hover:bg-white/[0.09]">
              <Users size={17} className="text-cyan-300" />

              <strong className="mt-3 block text-2xl font-extrabold">
                {communities?.value ?? "—"}
              </strong>

              <span className="mt-1 block text-[10px] text-slate-500">
                Communities
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl transition hover:bg-white/[0.09]">
              <Zap size={17} className="text-amber-300" />

              <strong className="mt-3 block text-2xl font-extrabold">
                {signalActivity.at(-1)?.signals ?? "—"}
              </strong>

              <span className="mt-1 block text-[10px] text-slate-500">
                Signals
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl transition hover:bg-white/[0.09]">
              <ShieldAlert size={17} className="text-red-300" />

              <strong className="mt-3 block text-2xl font-extrabold">
                {riskExposure?.value ?? "—"}
              </strong>

              <span className="mt-1 block text-[10px] text-slate-500">
                Risk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KPI CARDS
      ========================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <StatCard
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            description={metric.description}
            trend={metric.trend}
            iconStyle={metric.iconStyle}
          />
        ))}
      </section>

      {/* =========================================================
          CHARTS
      ========================================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Signal Activity"
          subtitle="Intelligence signals detected across the monitoring window"
          icon={TrendingUp}
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          }
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={signalActivity}
                margin={{
                  top: 10,
                  right: 8,
                  left: -18,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="signalGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartGrid}
                  vertical={false}
                />

                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chartText, fontSize: 11 }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: chartText, fontSize: 11 }}
                  width={38}
                />

                <Tooltip
                  cursor={{
                    stroke: theme === "dark" ? "#6366f1" : "#c7d2fe",
                    strokeWidth: 1,
                  }}
                  contentStyle={{
                    borderRadius: 14,
                    border: `1px solid ${tooltipBorder}`,
                    background: tooltipBackground,
                    color: tooltipText,
                    boxShadow:
                      theme === "dark"
                        ? "0 12px 30px rgba(0,0,0,0.35)"
                        : "0 12px 30px rgba(15,23,42,0.08)",
                    fontSize: 12,
                  }}
                  itemStyle={{
                    color: tooltipText,
                  }}
                  labelStyle={{
                    color: tooltipText,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="signals"
                  name="Signals"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fill="url(#signalGradient)"
                  activeDot={{
                    r: 5,
                    strokeWidth: 3,
                    stroke: theme === "dark" ? "#0f172a" : "#ffffff",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Risk Distribution"
          subtitle="Current ecosystem exposure by severity"
          icon={ShieldAlert}
        >
          <div className="flex h-[320px] flex-col items-center justify-center">
            <div className="relative h-[220px] w-full max-w-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {riskDistribution.map((item) => (
                      <Cell
                        key={item.name}
                        fill={riskColors[item.name]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${tooltipBorder}`,
                      background: tooltipBackground,
                      color: tooltipText,
                      boxShadow:
                        theme === "dark"
                          ? "0 12px 30px rgba(0,0,0,0.35)"
                          : "0 12px 30px rgba(15,23,42,0.08)",
                      fontSize: 12,
                    }}
                    itemStyle={{
                      color: tooltipText,
                    }}
                    labelStyle={{
                      color: tooltipText,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <strong className="text-3xl font-extrabold text-slate-950 dark:text-white">
                  {riskExposure?.value ?? "—"}
                </strong>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Exposure
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {riskDistribution.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: riskColors[item.name],
                    }}
                  />

                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {item.name}
                  </span>

                  <strong className="text-xs text-slate-900 dark:text-slate-100">
                    {item.value}%
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* =========================================================
          PLATFORM RISK
      ========================================================== */}
      <Panel
        title="Platform Risk Analysis"
        subtitle="Risk concentration across major digital categories"
        icon={BarChart3}
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
          >
            View analysis
            <ArrowUpRight size={13} />
          </button>
        }
      >
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={platformRisk}
              layout="vertical"
              margin={{
                top: 5,
                right: 8,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartGrid}
                horizontal={false}
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: chartText, fontSize: 11 }}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={85}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: chartAxisText,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />

              <Tooltip
                cursor={{ fill: chartCursor }}
                contentStyle={{
                  borderRadius: 12,
                  border: `1px solid ${tooltipBorder}`,
                  background: tooltipBackground,
                  color: tooltipText,
                  boxShadow:
                    theme === "dark"
                      ? "0 12px 30px rgba(0,0,0,0.35)"
                      : "0 12px 30px rgba(15,23,42,0.08)",
                  fontSize: 12,
                }}
                itemStyle={{
                  color: tooltipText,
                }}
                labelStyle={{
                  color: tooltipText,
                }}
                formatter={(value) => [`${value}%`, "Risk"]}
              />

              <Bar
                dataKey="risk"
                name="Risk"
                fill="#4f46e5"
                radius={[0, 7, 7, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* =========================================================
          INTELLIGENCE + INSIGHT
      ========================================================== */}
      <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Panel
          title="Intelligence Signals"
          subtitle="Priority indicators requiring monitoring"
          icon={Zap}
          action={
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {intelligenceEvents.length} active
            </span>
          }
        >
          <div className="space-y-3">
            {intelligenceEvents.slice(0, 4).map((item) => {
              const Icon =
                signalIcons[item.category] || Activity;

              const severity =
                signalStyles[item.severity] ||
                signalStyles.low;

              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-slate-50 hover:shadow-sm dark:border-slate-800 dark:hover:border-indigo-900/60 dark:hover:bg-slate-800/50"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${severity.icon}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {item.title}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${severity.badge}`}
                      >
                        {severity.label}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {item.source} · {item.time}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-slate-300 transition group-hover:text-indigo-500 dark:text-slate-600 dark:group-hover:text-indigo-400"
                  />
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Intelligence Insight"
          subtitle="Current ecosystem assessment"
          icon={Sparkles}
        >
          <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-200/40 blur-2xl dark:bg-indigo-500/10" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                    Intelligence score
                  </p>

                  <strong className="mt-1 block text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                    {dashboardInsight.score}
                  </strong>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                  <Sparkles size={18} />
                </div>
              </div>

              <h3 className="mt-5 text-sm font-bold leading-5 text-slate-900 dark:text-slate-100">
                {dashboardInsight.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {dashboardInsight.summary}
              </p>

              <div className="mt-5 space-y-2">
                {dashboardInsight.recommendations.map(
                  (recommendation, index) => (
                    <div
                      key={recommendation}
                      className="flex items-start gap-2.5 rounded-xl bg-white/80 px-3 py-2.5 dark:bg-slate-900/70"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                        {index + 1}
                      </span>

                      <span className="text-[11px] font-medium leading-5 text-slate-600 dark:text-slate-300">
                        {recommendation}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </Panel>
      </section>

      {/* =========================================================
          GLOBAL COVERAGE
      ========================================================== */}
      <Panel
        title="Global Coverage"
        subtitle="Current monitoring coverage across the ecosystem"
        icon={Globe2}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Monitoring coverage
                </p>

                <strong className="mt-1 block text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  86%
                </strong>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                <TrendingUp size={12} />
                +4.8%
              </span>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                style={{ width: "86%" }}
              />
            </div>

            <div className="mt-3 flex justify-between text-[10px] font-medium text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Platforms
              </p>

              <strong className="mt-1 block text-xl font-extrabold text-slate-900 dark:text-white">
                42
              </strong>

              <p className="mt-1 text-[10px] text-slate-400">
                Monitored
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Sources
              </p>

              <strong className="mt-1 block text-xl font-extrabold text-slate-900 dark:text-white">
                84
              </strong>

              <p className="mt-1 text-[10px] text-slate-400">
                Connected
              </p>
            </div>
          </div>
        </div>
      </Panel>

      {/* =========================================================
          FOOTER STATUS
      ========================================================== */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>

          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
              NEXUS Intelligence Engine Online
            </p>

            <p className="text-[10px] text-slate-400">
              Frontend intelligence simulation · Monitoring systems operational
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
          <Globe2 size={13} />
          Global monitoring active
        </div>
      </div>
    </div>
  );
}

export default Dashboard;