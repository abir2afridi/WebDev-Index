import { useState, useRef, useEffect } from "react";
import { User, Bell, Search, X, Command, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { searchTechnologies, Technology, categories, technologies } from "@/data/technologies";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { Sun, Moon, Zap } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Technology[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const { language, t } = useLanguage();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return t("nav.overview");
    if (path === "/ranking") return t("nav.ranking");
    if (path === "/roadmaps") return t("nav.roadmaps");
    if (path === "/bookmarks") return t("nav.bookmarks");
    if (path === "/compare") return t("nav.compare");
    if (path === "/dev-tools") return t("nav.devTools");
    if (path === "/settings") return t("nav.settings");
    if (path.startsWith("/category/")) {
       const slug = path.split("/").pop();
       const cat = categories.find(c => c.slug === slug);
       return cat ? cat.name : t("header.category");
    }
    if (path.startsWith("/tech/")) {
       const slug = path.split("/").pop();
       const tech = technologies.find(t => t.slug === slug);
       return tech ? tech.name : t("header.intel");
    }
    return "";
  };

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchTechnologies(query).slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.querySelector("input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'bn-BD', { 
       weekday: 'short', 
       month: 'short', 
       day: 'numeric', 
       year: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'en' ? 'en-US' : 'bn-BD', { 
       hour12: false, 
       hour: '2-digit', 
       minute: '2-digit', 
       second: '2-digit' 
    });
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-12 lg:h-14 border-b border-border/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-50 px-4 sm:px-6 flex items-center justify-between transition-all duration-300 shadow-sm shadow-black/5">
      <div className="flex items-center gap-4 flex-1">
        {/* Page Title & Clock */}
        <div className="flex items-center gap-4 lg:gap-10">
          <div className="flex flex-col border-l-2 border-primary pl-4 py-0.5">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t("header.indexNode")}</span>
            <h2 className="text-xs lg:text-[13px] font-black text-slate-900 dark:text-slate-100 uppercase italic tracking-tighter transition-all">
              {getPageTitle()}
            </h2>
          </div>

          <div className="hidden sm:flex flex-col border-l border-border/20 pl-6 py-0.5">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t("header.systemTime")}</span>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 tabular-nums uppercase">{formatDate(time)}</span>
              <div className="h-2.5 w-px bg-border/20" />
              <span className="text-[10px] font-black text-primary tabular-nums tracking-widest uppercase">{formatTime(time)}</span>
            </div>
          </div>
        </div>

        {/* Search Bar in Header */}
        <div ref={searchRef} className="relative w-full max-w-[200px] sm:max-w-xs group ml-auto mr-4 hidden sm:block">
          <div className={cn(
            "flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/50 border transition-all duration-300",
            isFocused ? "border-primary ring-4 ring-primary/5 bg-white dark:bg-slate-900 shadow-xl" : "border-border/10 hover:border-border/30 hover:bg-slate-50 dark:hover:bg-slate-800/80"
          )}>
            <Search className={cn("size-3 transition-colors", isFocused ? "text-primary" : "text-slate-500")} />
            <input 
              type="text"
              placeholder={t("header.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="bg-transparent border-none outline-none w-full text-[10px] font-bold uppercase placeholder:text-slate-400 text-slate-900 dark:text-slate-100"
            />
            {!isFocused && !query && (
              <div className="hidden sm:flex items-center gap-1 px-1 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-border/40 scale-75 shadow-sm">
                <Command className="size-2 text-slate-400" />
                <span className="text-[8px] font-black text-slate-400">K</span>
              </div>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isFocused && (results.length > 0 || (query.length >= 2 && results.length === 0)) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border/40 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-50">
              <div className="p-1.5">
                {results.length > 0 ? (
                  results.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => {
                        navigate(`/tech/${tech.slug}`);
                        setIsFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group/item"
                    >
                      <div className="size-7 flex items-center justify-center shrink-0">
                        {tech.logo ? <img src={tech.logo} alt="" className="max-w-full max-h-full object-contain filter drop-shadow-sm" /> : <div className="text-[9px] font-black text-primary/40">{tech.name[0]}</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-black text-slate-900 dark:text-slate-100 truncate tracking-tight uppercase italic">{tech.name}</div>
                        <p className="text-[9px] font-bold text-slate-400 line-clamp-1 leading-none">{tech.type}</p>
                      </div>
                      <ArrowRight className="size-3 text-primary opacity-0 group-hover/item:opacity-100 transition-all" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight italic">{t("header.noMatches")}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggle}
          className="size-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20"
        >
          {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        </Button>
        <Button variant="ghost" size="icon" className="size-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
          <Bell className="size-3.5" />
        </Button>
        <div className="h-6 w-px bg-border/20 mx-1" />
        <div className="flex items-center gap-2.5 pl-1.5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black tracking-tight text-slate-900 dark:text-slate-100 uppercase italic leading-none">{t("header.admin")}</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">{t("header.securityNode")}</span>
          </div>
          <div className="size-8 rounded-lg bg-slate-900 dark:bg-primary flex items-center justify-center border border-white/10 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer group">
            <User className="size-3.5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
