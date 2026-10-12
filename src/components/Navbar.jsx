import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const searchItems = [
  {
    title: "Executive Overview",
    description: "Monitor digital ecosystems and intelligence signals",
    keywords: "dashboard overview intelligence ecosystem",
    path: "/",
  },
  {
    title: "Graph Explorer",
    description: "Explore platform and community relationships",
    keywords: "graph network connections relationships",
    path: "/graph",
  },
  {
    title: "Risk Analysis",
    description: "Analyze digital monoculture and dependency risk",
    keywords: "risk danger dependency exposure analysis",
    path: "/risk",
  },
  {
    title: "Discovery",
    description: "Explore emerging trends and digital signals",
    keywords: "discovery trends emerging signals",
    path: "/discovery",
  },
  {
    title: "Data Sources",
    description: "Review intelligence sources and source health",
    keywords: "data sources platforms intelligence",
    path: "/sources",
  },
  {
    title: "Reports",
    description: "Review intelligence reports and summaries",
    keywords: "reports summary analysis intelligence",
    path: "/reports",
  },
];

const notifications = [
  {
    id: 1,
    title: "Platform dependency increased",
    description:
      "Risk intelligence detected a new concentration signal.",
    time: "4 minutes ago",
    type: "risk",
    path: "/risk",
  },
  {
    id: 2,
    title: "New community cluster detected",
    description:
      "Discovery intelligence identified an emerging relationship.",
    time: "11 minutes ago",
    type: "discovery",
    path: "/discovery",
  },
];

function Navbar({ onMenuClick }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const unreadCount = notifications.filter(
    (notification) => !readNotifications.includes(notification.id)
  ).length;

  const filteredResults = searchItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return false;

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.keywords.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      const clickedDesktopSearch =
        desktopSearchRef.current?.contains(event.target);

      const clickedMobileSearch =
        mobileSearchRef.current?.contains(event.target);

      if (!clickedDesktopSearch && !clickedMobileSearch) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setSearchQuery("");
    setSearchFocused(false);
    setMobileSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleGlobalShortcut = (event) => {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        const tagName = event.target.tagName;

        if (
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT"
        ) {
          return;
        }

        event.preventDefault();

        const desktopInput =
          desktopSearchRef.current?.querySelector("input");

        if (desktopInput) {
          desktopInput.focus();
        } else {
          setMobileSearchOpen(true);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalShortcut);

    return () => {
      document.removeEventListener("keydown", handleGlobalShortcut);
    };
  }, []);

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearchQuery("");
      setSearchFocused(false);
      setMobileSearchOpen(false);
      event.currentTarget.blur();
      return;
    }

    if (event.key === "Enter" && filteredResults.length > 0) {
      handleSearchSelect(filteredResults[0].path);
    }
  };

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchFocused(false);
    setMobileSearchOpen(false);
  };

  const handleOpenAssistant = () => {
    window.dispatchEvent(new CustomEvent("nexus:open-ai"));
  };

  const handleNotificationClick = (notification) => {
    setReadNotifications((current) => {
      if (current.includes(notification.id)) {
        return current;
      }

      return [...current, notification.id];
    });

    setNotificationsOpen(false);
    navigate(notification.path);
  };

  const handleMarkAllRead = () => {
    setReadNotifications(
      notifications.map((notification) => notification.id)
    );
  };

  const handleProfileAction = (action) => {
    setProfileOpen(false);

    if (action === "dashboard") {
      navigate("/");
    }

    if (action === "theme") {
      toggleTheme();
    }
  };

  const getNotificationIcon = (type) => {
    if (type === "risk") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <Shield size={16} />
        </div>
      );
    }

    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
        <Activity size={16} />
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="flex h-[72px] items-center gap-3 px-3 sm:px-5 lg:px-7">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>

        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-3"
          aria-label="Go to NEXUS dashboard"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
            <Activity size={21} strokeWidth={2.4} />

            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-950" />
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                NEXUS
              </span>

              <span className="hidden rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-600 lg:inline-flex dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
                Intelligence
              </span>
            </div>

            <p className="text-[10px] font-medium text-slate-400">
              Digital Monoculture
            </p>
          </div>
        </button>

        {/* Desktop Search */}
        <div
          ref={desktopSearchRef}
          className="relative ml-2 hidden min-w-0 max-w-2xl flex-1 md:block lg:ml-4"
        >
          <div
            className={`flex h-11 items-center gap-3 rounded-xl border bg-slate-50 px-4 transition duration-200 dark:bg-slate-900 ${
              searchFocused
                ? "border-indigo-300 bg-white shadow-sm ring-4 ring-indigo-500/5 dark:border-indigo-700 dark:bg-slate-900"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <Search
              size={17}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search intelligence, platforms, networks..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              aria-label="Search intelligence"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchFocused(false);
                }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}

            <kbd className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-400 xl:block dark:border-slate-700 dark:bg-slate-800">
              /
            </kbd>
          </div>

          {searchFocused && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[70] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">
              {filteredResults.length > 0 ? (
                <div className="max-h-[380px] overflow-y-auto p-2">
                  <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Intelligence results
                  </p>

                  {filteredResults.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleSearchSelect(item.path)}
                      className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                        <Search size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-8 text-center">
                  <Search
                    size={22}
                    className="mx-auto text-slate-300 dark:text-slate-600"
                  />

                  <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No intelligence found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try searching for risk, network, discovery or reports.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => {
              setMobileSearchOpen((current) => !current);
              setSearchFocused(false);
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
            aria-label={mobileSearchOpen ? "Close search" : "Open search"}
            aria-expanded={mobileSearchOpen}
          >
            {mobileSearchOpen ? <X size={17} /> : <Search size={17} />}
          </button>

          {/* AI Assistant */}
          <button
            type="button"
            onClick={handleOpenAssistant}
            className="hidden h-10 shrink-0 items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 text-sm font-semibold text-indigo-600 transition hover:border-indigo-200 hover:bg-indigo-100 active:scale-95 sm:flex dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-950"
            aria-label="Open NEXUS AI Assistant"
          >
            <Sparkles size={16} />
            <span>AI Assistant</span>
          </button>

          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
            aria-label={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            title={
              theme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((current) => !current);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notificationsOpen}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                notificationsOpen
                  ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
              }`}
            >
              <Bell size={17} />

              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-indigo-500 px-1 text-[8px] font-bold text-white dark:border-slate-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[80] w-[min(380px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Notifications
                    </p>

                    <p className="truncate text-[11px] text-slate-400">
                      Latest intelligence updates
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/50"
                    >
                      <Check size={12} />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.map((notification) => {
                    const isRead = readNotifications.includes(
                      notification.id
                    );

                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          handleNotificationClick(notification)
                        }
                        className={`flex w-full gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                          isRead ? "opacity-70" : ""
                        }`}
                      >
                        {getNotificationIcon(notification.type)}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                              {notification.title}
                            </p>

                            {!isRead && (
                              <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                                New
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-[11px] leading-5 text-slate-400">
                            {notification.description}
                          </p>

                          <span className="mt-1 block text-[10px] text-slate-400">
                            {notification.time}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-center text-[10px] font-medium text-slate-400">
                    Frontend intelligence simulation
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px shrink-0 bg-slate-200 md:block dark:bg-slate-800" />

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative hidden shrink-0 md:block"
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen((current) => !current);
                setNotificationsOpen(false);
              }}
              className={`flex h-10 items-center gap-2 rounded-xl border px-2 py-1.5 text-left transition ${
                profileOpen
                  ? "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/40"
                  : "border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:border-slate-800 dark:hover:bg-slate-900"
              }`}
              aria-label="Open NEXUS Analyst profile menu"
              aria-expanded={profileOpen}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-[10px] font-black text-white shadow-sm">
                NX
              </div>

              <div className="hidden xl:block">
                <p className="text-xs font-semibold whitespace-nowrap text-slate-800 dark:text-slate-200">
                  NEXUS Analyst
                </p>

                <p className="whitespace-nowrap text-[10px] text-slate-400">
                  Intelligence Console
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`hidden shrink-0 text-slate-400 transition-transform xl:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-[80] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">
                <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-sm font-black backdrop-blur-sm">
                      NX
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-black">
                        NEXUS Analyst
                      </p>

                      <p className="text-[10px] font-medium text-white/75">
                        Intelligence Console
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleProfileAction("profile")
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-200 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                      <User size={15} />
                    </div>

                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleProfileAction("settings")
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-violet-50 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-violet-950/40 dark:hover:text-violet-300"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                      <Settings size={15} />
                    </div>

                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleProfileAction("theme")
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-amber-700 dark:text-slate-200 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                      {theme === "light" ? (
                        <Moon size={15} />
                      ) : (
                        <Sun size={15} />
                      )}
                    </div>

                    {theme === "light"
                      ? "Dark Mode"
                      : "Light Mode"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleProfileAction("dashboard")
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-300"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400">
                      <Activity size={15} />
                    </div>

                    Intelligence Console
                  </button>
                </div>

                <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
                  <p className="text-[10px] font-semibold text-slate-400">
                    Frontend profile simulation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="relative z-[60] border-t border-slate-100 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden"
        >
          <div className="relative">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 dark:border-slate-800 dark:bg-slate-900 dark:focus-within:bg-slate-900">
              <Search
                size={16}
                className="shrink-0 text-slate-400"
              />

              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search intelligence..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
                aria-label="Mobile intelligence search"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchFocused(false);
                  }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {searchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[90] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                {filteredResults.length > 0 ? (
                  <div className="max-h-[320px] overflow-y-auto p-2">
                    {filteredResults.map((item) => (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => handleSearchSelect(item.path)}
                        className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                          <Search size={14} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {item.title}
                          </p>

                          <p className="mt-0.5 text-xs leading-5 text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-6 text-center">
                    <Search
                      size={20}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      No intelligence found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try risk, network, discovery or reports.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;