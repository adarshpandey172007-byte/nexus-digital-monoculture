import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AIAssistant from "./components/AIAssistant";
import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const GraphExplorer = lazy(() => import("./pages/GraphExplorer"));
const RiskAnalysis = lazy(() => import("./pages/RiskAnalysis"));
const Discovery = lazy(() => import("./pages/Discovery"));
const DataSources = lazy(() => import("./pages/DataSources"));
const Reports = lazy(() => import("./pages/Reports"));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
        <p className="text-xs font-semibold text-slate-400">
          Loading NEXUS intelligence...
        </p>
      </div>
    </div>
  );
}

function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 bg-slate-50">
          <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-6 lg:p-8">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/graph" element={<GraphExplorer />} />
                <Route path="/risk" element={<RiskAnalysis />} />
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/sources" element={<DataSources />} />
                <Route path="/reports" element={<Reports />} />

                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;