export const dashboardMetrics = [
  {
    label: "Digital Signals",
    value: "12,842",
    change: "+14.8%",
    description: "Signals processed across monitored ecosystems",
    trend: "up",
    iconStyle: "indigo",
  },
  {
    label: "Active Networks",
    value: "1,284",
    change: "+8.2%",
    description: "Connected networks currently being monitored",
    trend: "up",
    iconStyle: "cyan",
  },
  {
    label: "Communities",
    value: "156",
    change: "+5.6%",
    description: "Communities represented in the intelligence graph",
    trend: "up",
    iconStyle: "emerald",
  },
  {
    label: "Risk Exposure",
    value: "68%",
    change: "+6.4%",
    description: "Current ecosystem concentration risk",
    trend: "down",
    iconStyle: "red",
  },
];

export const signalActivity = [
  { time: "00:00", signals: 32, anomalies: 8 },
  { time: "04:00", signals: 41, anomalies: 11 },
  { time: "08:00", signals: 58, anomalies: 15 },
  { time: "12:00", signals: 74, anomalies: 19 },
  { time: "16:00", signals: 68, anomalies: 14 },
  { time: "20:00", signals: 86, anomalies: 22 },
  { time: "24:00", signals: 96, anomalies: 27 },
];

export const platformRisk = [
  { name: "Social", risk: 82 },
  { name: "News", risk: 67 },
  { name: "Finance", risk: 61 },
  { name: "Gaming", risk: 48 },
  { name: "Education", risk: 39 },
];

export const ecosystemExposure = [
  {
    name: "Platforms",
    value: 24,
  },
  {
    name: "Communities",
    value: 156,
  },
  {
    name: "Networks",
    value: 1284,
  },
];

export const riskDistribution = [
  {
    name: "High",
    value: 28,
  },
  {
    name: "Medium",
    value: 47,
  },
  {
    name: "Low",
    value: 25,
  },
];

export const intelligenceEvents = [
  {
    id: 1,
    title: "Platform dependency increased",
    category: "Risk",
    source: "Social ecosystem",
    time: "4 min ago",
    severity: "high",
  },
  {
    id: 2,
    title: "Emerging community cluster detected",
    category: "Discovery",
    source: "Community network",
    time: "11 min ago",
    severity: "medium",
  },
  {
    id: 3,
    title: "Cross-platform signal correlation",
    category: "Network",
    source: "Digital graph",
    time: "18 min ago",
    severity: "medium",
  },
  {
    id: 4,
    title: "Information concentration pattern updated",
    category: "Intelligence",
    source: "News ecosystem",
    time: "26 min ago",
    severity: "low",
  },
  {
    id: 5,
    title: "New high-impact network identified",
    category: "Network",
    source: "Global signals",
    time: "34 min ago",
    severity: "high",
  },
];

export const dashboardInsight = {
  score: 78,
  title: "Digital ecosystems are becoming increasingly concentrated",
  summary:
    "Current intelligence signals indicate rising platform dependency across several monitored ecosystems. Social and news networks currently represent the highest concentration exposure.",
  recommendations: [
    "Monitor high-dependency platforms",
    "Track emerging cross-platform relationships",
    "Investigate rapidly growing communities",
  ],
};