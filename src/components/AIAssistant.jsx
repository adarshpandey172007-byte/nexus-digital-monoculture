import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  Clock3,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const responses = {
  risk: "NEXUS detects elevated platform dependency across several digital ecosystems. The current intelligence layer indicates that concentration risk should be monitored closely.",
  network:
    "The network intelligence layer maps relationships between platforms, communities, information sources and emerging digital patterns.",
  discovery:
    "Discovery identifies emerging signals, fast-growing communities and unusual digital activity that may require further investigation.",
  source:
    "NEXUS uses structured frontend intelligence data representing social, news, community and platform signals.",
  report:
    "Reports provide condensed intelligence summaries covering ecosystem exposure, platform dependency, risk indicators and emerging patterns.",
  default:
    "I can help you explore NEXUS risk, networks, discovery signals, data sources and intelligence reports.",
};

const quickPrompts = [
  "Show current risk",
  "Explain the network",
  "What is trending?",
];

function getResponse(message) {
  const text = message.toLowerCase();

  if (
    text.includes("risk") ||
    text.includes("danger") ||
    text.includes("exposure")
  ) {
    return responses.risk;
  }

  if (
    text.includes("network") ||
    text.includes("graph") ||
    text.includes("connection")
  ) {
    return responses.network;
  }

  if (
    text.includes("discover") ||
    text.includes("trend") ||
    text.includes("emerging")
  ) {
    return responses.discovery;
  }

  if (
    text.includes("source") ||
    text.includes("data") ||
    text.includes("platform")
  ) {
    return responses.source;
  }

  if (
    text.includes("report") ||
    text.includes("summary") ||
    text.includes("analysis")
  ) {
    return responses.report;
  }

  return responses.default;
}

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Welcome to NEXUS Intelligence. How can I help you explore the digital ecosystem?",
      time: "Now",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleOpenAssistant = () => {
      setOpen(true);
    };

    window.addEventListener("nexus:open-ai", handleOpenAssistant);

    return () => {
      window.removeEventListener("nexus:open-ai", handleOpenAssistant);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, typing]);

  const handleSend = (customMessage = null) => {
    const value = (customMessage ?? message).trim();

    if (!value || typing) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: value,
      time: "Now",
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setTyping(true);

    window.setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: getResponse(value),
        time: "Now",
      };

      setMessages((current) => [...current, assistantMessage]);
      setTyping(false);
    }, 650);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-2xl active:scale-95 dark:bg-white dark:text-slate-950 dark:shadow-black/30 dark:hover:bg-slate-200"
          aria-label="Open NEXUS AI Assistant"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-indigo-400/30" />

            <Sparkles
              size={17}
              className="relative text-indigo-300 dark:text-indigo-600"
            />
          </span>

          <span>AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 z-50 flex h-[min(680px,calc(100vh-32px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 sm:bottom-6 sm:right-6">
          <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950 px-5 py-4 text-white dark:border-slate-800">
            <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
                  <Bot size={19} />

                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">NEXUS AI</p>

                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-300">
                      Beta
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[10px] text-slate-400">
                      Intelligence Assistant · Online
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Assistant"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white active:scale-95"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950">
            <div className="space-y-4">
              {messages.map((item) => {
                const isUser = item.role === "user";

                return (
                  <div
                    key={item.id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          isUser
                            ? "rounded-br-md bg-indigo-600 text-white shadow-sm shadow-indigo-600/10"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                        }`}
                      >
                        {!isUser && (
                          <div className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                            <Sparkles size={11} />
                            NEXUS AI
                          </div>
                        )}

                        {item.text}
                      </div>

                      <div
                        className={`mt-1.5 flex items-center gap-1 text-[9px] text-slate-400 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {isUser ? (
                          <>
                            <Check size={10} />
                            {item.time}
                          </>
                        ) : (
                          <>
                            <Clock3 size={10} />
                            {item.time}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-slate-100 bg-white px-4 pb-2 pt-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center gap-1.5">
              <Zap size={11} className="text-indigo-500" />

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Quick prompts
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 dark:border-slate-700 dark:bg-slate-800 dark:focus-within:border-indigo-700 dark:focus-within:bg-slate-800 dark:focus-within:ring-indigo-500/10">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask NEXUS AI..."
                disabled={typing}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-50 dark:text-slate-200 dark:placeholder:text-slate-500"
                aria-label="Ask NEXUS AI"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!message.trim() || typing}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between px-1">
              <p className="text-[9px] text-slate-400">
                Press Enter to send
              </p>

              <p className="text-[9px] text-slate-400">
                Frontend simulation · No external API
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistant;